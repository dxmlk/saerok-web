import { useEffect, useRef } from "react";
import Matter from "matter-js";

type OnMeaning = () => void;

export const useMatterSimulation = (scale = 1) => {
  const initializedRef = useRef(false);
  const selectedRef = useRef<string | null>(null);
  const transitioningRef = useRef(false);

  const wordBodiesRef = useRef<
    Map<
      string,
      {
        elem: HTMLElement;
        body: Matter.Body;
        width: number;
        height: number;
      }
    >
  >(new Map());

  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const liftRafRef = useRef<number | null>(null);

  const barrierActivatedRef = useRef(false);
  const topBarrierRef = useRef<Matter.Body | null>(null);
  const topBarrierThicknessRef = useRef<number>(80);

  // 선택 시 목표 폰트 사이즈
  const TARGET_SELECTED_FONT_PX = 110;

  // 리프트/스크롤 속도
  const SCROLL_UP_MS = 850;
  const LIFT_MOVE_MS = 1100;

  // meaning 등장 타이밍(리프트 진행률 0~1)
  const MEANING_SHOW_T = 0.72;

  // 낙하 힘
  const BASE_FORCE = 0.0035;

  // meaning overlay 위치 - WordCloud의 top-[35vh]와 맞추기
  const MEANING_OVERLAY_VH = 0.38;

  // meaning 영역을 얼마나 비워둘지(px)
  const MEANING_SAFE_PADDING_PX = 80;

  // 글로우 세기(0~1로 보간됨)
  const glowFilter = (g: number) =>
    `drop-shadow(0px 10px ${16 + 12 * g}px rgba(255,255,255,${
      0.15 + 0.55 * g
    }))`;

  const isPhysicsReady = () => initializedRef.current;

  const cancelLiftRaf = () => {
    if (liftRafRef.current !== null) {
      cancelAnimationFrame(liftRafRef.current);
      liftRafRef.current = null;
    }
  };

  const cancelScrollRaf = () => {
    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }
  };

  const scrollToY = (targetY: number, duration = SCROLL_UP_MS) => {
    cancelScrollRaf();

    const startY = window.scrollY;
    const startTime = performance.now();

    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

    return new Promise<void>((resolve) => {
      const step = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = easeOutQuad(t);
        const currentY = startY + (targetY - startY) * eased;
        window.scrollTo(0, currentY);

        if (t < 1) {
          scrollRafRef.current = requestAnimationFrame(step);
        } else {
          scrollRafRef.current = null;
          resolve();
        }
      };

      scrollRafRef.current = requestAnimationFrame(step);
    });
  };

  const getScrollYHideFloor = () => {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;

    const floor = document.getElementById("wordcloud-floor");
    if (!floor) return Math.min(window.scrollY, maxScroll);

    const rect = floor.getBoundingClientRect();
    const floorTopAbs = window.scrollY + rect.top;

    // floor가 화면에 안 보이도록
    const margin = 8;
    const targetY = floorTopAbs - window.innerHeight - margin;

    return Math.max(0, Math.min(targetY, maxScroll));
  };

  const getTargetScaleForSelected = (elem: HTMLElement) => {
    const base = Number(elem.dataset.baseFontsize ?? "56");
    return TARGET_SELECTED_FONT_PX / base;
  };

  const setNoCollision = (body: Matter.Body, on: boolean) => {
    const origMask = (body as any).origMask ?? 0xffffffff;
    body.collisionFilter.mask = on ? 0 : origMask;
  };

  const setBodyLifted = (body: Matter.Body, lifted: boolean) => {
    const origMask = (body as any).origMask ?? 0xffffffff;

    if (lifted) {
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
      Matter.Body.setAngle(body, 0);
      Matter.Body.setStatic(body, true);
      body.collisionFilter.mask = 0; // 떠 있을 때 충돌 제거
    } else {
      Matter.Body.setStatic(body, false);
      body.collisionFilter.mask = origMask; // 떨어질 때 복구
    }
  };

  const waitUntil = (cond: () => boolean, timeoutMs = 900) => {
    const start = performance.now();
    return new Promise<void>((resolve) => {
      const step = () => {
        if (cond()) return resolve();
        if (performance.now() - start > timeoutMs) return resolve(); // 타임아웃 안전장치
        requestAnimationFrame(step);
      };
      step();
    });
  };

  const releaseSelectedSafely = async () => {
    const current = selectedRef.current;
    if (!current) return;

    const wb = wordBodiesRef.current.get(current);
    if (!wb) {
      selectedRef.current = null;
      return;
    }

    // 강조 원복
    wb.elem.dataset.scale = "1";
    wb.elem.dataset.glow = "0";

    // 떠있던 걸 다시 dynamic으로
    setBodyLifted(wb.body, false);

    // 핵심: barrier 아래로 완전 내려갈 때까지 해당 body만 무충돌
    setNoCollision(wb.body, true);

    // 떨어지는 시작 속도 너무 약하면 barrier 아래로 내려가기도 전에 멈칫함
    Matter.Body.setVelocity(wb.body, { x: 0, y: 7 });

    // topBarrier 아래로 통과할 기준선
    const barrier = topBarrierRef.current;
    const thickness = topBarrierThicknessRef.current ?? 80;

    // barrier가 아직 없거나, 아직 sensor라면 굳이 오래 무충돌 유지할 필요 없음
    if (barrier && barrier.isSensor === false) {
      const passY = barrier.position.y + thickness / 2 + 20;

      await waitUntil(() => wb.body.position.y > passY, 900);
    } else {
      // 최소 1프레임은 유지(튀는 것 방지)
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
    }

    // 통과했으니 충돌 복구
    setNoCollision(wb.body, false);

    selectedRef.current = null;
  };

  const animateBodyTo = (
    body: Matter.Body,
    target: { x: number; y: number },
    duration: number
  ) => {
    const start = performance.now();
    const from = { x: body.position.x, y: body.position.y };

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    return new Promise<void>((resolve) => {
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = easeInOutCubic(t);

        const x = from.x + (target.x - from.x) * eased;
        const y = from.y + (target.y - from.y) * eased;

        Matter.Body.setPosition(body, { x, y });
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setAngle(body, 0);
        Matter.Body.setAngularVelocity(body, 0);

        if (t < 1) {
          liftRafRef.current = requestAnimationFrame(step);
        } else {
          liftRafRef.current = null;
          resolve();
        }
      };

      liftRafRef.current = requestAnimationFrame(step);
    });
  };

  const liftWord = async (word: string, onMeaning?: OnMeaning) => {
    const wb = wordBodiesRef.current.get(word);
    if (!wb) return;

    cancelLiftRaf();

    // 리프트 시작: dynamic 상태로 두고(이동 중), 충돌은 끊어서 흔들림 방지
    setBodyLifted(wb.body, false);
    setNoCollision(wb.body, true);

    const targetX = window.innerWidth / 2;
    const topOffset = Math.round(window.innerHeight * 0.1); // 리프트 후 단어의 세로 위치

    const targetScale = getTargetScaleForSelected(wb.elem);
    const startScale = Number(wb.elem.dataset.scale ?? "1");

    let meaningShown = false;

    // 스크롤 + 이동 병렬
    const scrollPromise = scrollToY(getScrollYHideFloor(), SCROLL_UP_MS);

    const movePromise = new Promise<void>((resolve) => {
      const duration = LIFT_MOVE_MS;
      const start = performance.now();

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = easeInOutCubic(t);

        // 진행률 기반 강조(서서히)
        const s = startScale + (targetScale - startScale) * eased;
        wb.elem.dataset.scale = String(s);
        wb.elem.dataset.glow = String(eased);

        // 의미는 중간쯤에 등장
        if (!meaningShown && t >= MEANING_SHOW_T) {
          meaningShown = true;
          onMeaning?.();
        }

        // 스크롤이 움직이는 동안 목표 y도 따라가게
        const targetWorldY = window.scrollY + topOffset;

        //  부드러움 정도 낮을수록 더 부드럽고 느림
        const lerp = 0.12 + 0.18 * eased; // 0.12~0.30

        const cur = wb.body.position;
        const nextX = cur.x + (targetX - cur.x) * lerp;
        const nextY = cur.y + (targetWorldY - cur.y) * lerp;

        Matter.Body.setPosition(wb.body, { x: nextX, y: nextY });
        Matter.Body.setVelocity(wb.body, { x: 0, y: 0 });
        Matter.Body.setAngle(wb.body, 0);
        Matter.Body.setAngularVelocity(wb.body, 0);

        if (t < 1) {
          liftRafRef.current = requestAnimationFrame(step);
        } else {
          liftRafRef.current = null;
          resolve();
        }
      };

      liftRafRef.current = requestAnimationFrame(step);
    });

    await Promise.all([scrollPromise, movePromise]);

    // 마지막 미세 스냅, 너무 딱딱하면 duration 늘리기
    const finalY = window.scrollY + topOffset;
    await animateBodyTo(wb.body, { x: targetX, y: finalY }, 240);

    //  고정(리프트 완료)
    setBodyLifted(wb.body, true);
    wb.elem.dataset.scale = String(targetScale);
    wb.elem.dataset.glow = "1";
    // 떠 있을 때는 계속 충돌 없음(mask=0)
  };

  const onWordClick = async (word: string, onMeaning?: OnMeaning) => {
    if (!barrierActivatedRef.current) return;

    if (!initializedRef.current) return;

    if (transitioningRef.current) return;
    transitioningRef.current = true;

    try {
      // 전환 중 스크롤/리프트 애니메이션 끊기
      cancelScrollRaf();
      cancelLiftRaf();

      // 이미 떠 있는 단어 재클릭 => 해제
      if (selectedRef.current === word) {
        await releaseSelectedSafely();
        return;
      }

      // 기존 선택 해제 후 새로 리프트
      await releaseSelectedSafely();

      selectedRef.current = word;
      await liftWord(word, onMeaning);
    } finally {
      transitioningRef.current = false;
    }
  };

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;

    const canvasRoot = document.getElementById("matter-canvas");
    if (!canvasRoot) return;

    const BREAK_Y = window.innerHeight * 1.1;

    const initPhysics = () => {
      if (initializedRef.current) return;

      const engine = Engine.create();
      engine.gravity.y = 0;
      engineRef.current = engine;

      let barrierActivated = false;

      // 몇 %가 바리케읻 아래로 내려오면 활성화할지
      const BARRIER_READY_RATIO = 0.9;

      let readyFrames = 0;
      const READY_FRAMES_NEED = 10;

      // 충돌 해석 안정화 (지터 감소)
      engine.positionIterations = 12; //  10~14
      engine.velocityIterations = 10; // \ 8~12

      // Sleeping 활성화 단어들이 바닥에 정착하면 멈추는 거
      engine.enableSleeping = true;

      const root = document.getElementById("wordcloud-root");
      const rootHeight = root?.offsetHeight ?? window.innerHeight * 3;

      const canvasSize = {
        width: window.innerWidth,
        height: rootHeight,
      };

      const render = Render.create({
        element: canvasRoot,
        engine,
        options: {
          width: canvasSize.width,
          height: canvasSize.height,
          wireframes: false,
          background: "transparent",
        },
      });
      renderRef.current = render;

      render.canvas.style.display = "block";
      render.canvas.style.border = "none";
      render.canvas.style.outline = "none";
      render.canvas.style.background = "transparent";

      const floorEl = document.getElementById("wordcloud-floor");
      const floorTop = floorEl ? floorEl.offsetTop : canvasSize.height;

      const FLOOR_THICKNESS = 40;

      // 실제 바닥(파란 div 위)
      const floor = Bodies.rectangle(
        canvasSize.width / 2,
        floorTop + FLOOR_THICKNESS / 2,
        canvasSize.width,
        FLOOR_THICKNESS,
        { isStatic: true }
      );

      // safetyFloor: 무한 추락 완전 방지
      const safetyFloor = Bodies.rectangle(
        canvasSize.width / 2,
        canvasSize.height + 300,
        canvasSize.width * 2,
        120,
        { isStatic: true }
      );

      const wallHeight = Math.max(floorTop + 600, canvasSize.height);
      const wallCenterY = wallHeight / 2;

      const leftWall = Bodies.rectangle(0, wallCenterY, 40, wallHeight, {
        isStatic: true,
      });
      const rightWall = Bodies.rectangle(
        canvasSize.width,
        wallCenterY,
        40,
        wallHeight,
        {
          isStatic: true,
        }
      );
      const ceiling = Bodies.rectangle(
        canvasSize.width / 2,
        0,
        canvasSize.width,
        40,
        {
          isStatic: true,
        }
      );

      // 상단 바리케이드: 선택/meaning 영역을 침범 못하게 막기
      const rootEl = document.getElementById("wordcloud-root");

      // rootTopAbs(페이지 절대좌표)
      const rootTopAbs = rootEl
        ? window.scrollY + rootEl.getBoundingClientRect().top
        : 0;

      // floorTopAbs(페이지 절대좌표) = rootTopAbs + root 내부 offsetTop
      const floorTopAbs = rootTopAbs + floorTop;

      // floor가 화면에 안 보이게 올리는 목표 스크롤(Y)
      const margin = 8;
      const targetScrollY = floorTopAbs - window.innerHeight - margin;

      // meaning overlay가 화면에서 MEANING_OVERLAY_VH 위치에 있으니
      // 그 위치에 해당하는 "월드 y"에 바리케이드를 둔다.
      let barrierWorldY =
        targetScrollY -
        rootTopAbs +
        window.innerHeight * MEANING_OVERLAY_VH -
        MEANING_SAFE_PADDING_PX;

      // 너무 위로 올라가면 클램프
      barrierWorldY = Math.max(80, barrierWorldY);

      const TOP_BARRIER_THICKNESS = 80;

      const topBarrier = Bodies.rectangle(
        canvasSize.width / 2,
        barrierWorldY,
        canvasSize.width * 2,
        TOP_BARRIER_THICKNESS,
        { isStatic: true, isSensor: true, render: { visible: false } }
      );

      topBarrierRef.current = topBarrier;
      topBarrierThicknessRef.current = TOP_BARRIER_THICKNESS;

      // word DOM 찾기
      const elements = Array.from(
        document.querySelectorAll(".word")
      ) as HTMLElement[];

      const wordBodies = elements.map((elem, idx) => {
        const width = elem.offsetWidth;
        const height = elem.offsetHeight;

        const body = Bodies.rectangle(
          elem.offsetLeft,
          elem.offsetTop,
          width,
          height,
          {
            render: { fillStyle: "transparent" },

            // 지터링(부들부들 떨리는 거) 줄이는 설정들
            restitution: 0, // 반발 0
            friction: 0.9, // 마찰 크게
            frictionStatic: 1.0, // 정지 마찰 크게
            frictionAir: 0.02, // 공기저항(조금만)
            slop: 0.8, // 충돌 관통 허용(지터 완화)
            chamfer: { radius: 4 }, // 모서리 둥글게(스택 안정)

            sleepThreshold: 60, // 40~80
          }
        );

        // 충돌 마스크 원본 저장
        (body as any).origMask = body.collisionFilter.mask;

        // 개별 낙하 스케일
        const fallScale = 0.4 + Math.random() * 1.2;
        (body as any).fallScale = fallScale;

        // 초기 강조 값
        elem.dataset.scale = "1";
        elem.dataset.glow = "0";

        wordBodiesRef.current.set(elem.dataset.word ?? String(idx), {
          elem,
          body,
          width,
          height,
        });

        return { elem, body, width, height };
      });

      World.add(engine.world, [
        floor,
        safetyFloor,
        topBarrier,
        leftWall,
        rightWall,
        ceiling,
        ...wordBodies.map((wb) => wb.body),
      ]);

      Render.run(render);

      const meaningEl = document.getElementById(
        "wordcloud-meaning"
      ) as HTMLElement | null;

      const update = () => {
        // 낙하 + 렌더 동기화
        for (const wb of wordBodies) {
          const body = wb.body;

          // static(리프트 고정)인 애는 낙하 힘 적용 X
          if (!body.isStatic) {
            const fallScale = (body as any).fallScale ?? 1;
            const forceY = BASE_FORCE * fallScale * body.mass;

            Body.applyForce(body, body.position, { x: 0, y: forceY });
          }

          // DOM 위치 업데이트
          const { x, y } = body.position;
          wb.elem.style.top = `${y - wb.height / 2}px`;
          wb.elem.style.left = `${x - wb.width / 2}px`;

          // 부모(.word)는 회전만
          wb.elem.style.transform = `rotate(${body.angle}rad)`;

          // label만 scale+glow
          const label = wb.elem.querySelector(
            ".word-label"
          ) as HTMLElement | null;
          if (label) {
            const s = Number(wb.elem.dataset.scale ?? "1");
            const g = Number(wb.elem.dataset.glow ?? "0");
            label.style.transform = `scale(${s})`;
            label.style.filter = glowFilter(g);

            // 선택 시 굵기 바꾸고 싶으면(글로우랑 같이): g>0.2 같은 조건으로
            label.style.fontWeight = g > 0.2 ? "700" : "400";
          }

          // 색상 토글(기존 로직 유지)
          if (y < BREAK_Y) {
            wb.elem.classList.add("text-white");
            wb.elem.classList.remove("text-mainBlue");
          } else {
            wb.elem.classList.add("text-mainBlue");
            wb.elem.classList.remove("text-white");
          }
        }

        // topBarrier를 단어들이 다 떨어진 뒤에만 벽으로 전환
        if (!barrierActivated) {
          const total = wordBodies.length;

          // 바리케이드 기준선(월드 좌표): barrierWorldY + 두께/2 아래로 내려온 것만 count
          const thresholdY = topBarrier.position.y + TOP_BARRIER_THICKNESS / 2;

          const belowCount = wordBodies.reduce((acc, wb) => {
            return acc + (wb.body.position.y > thresholdY ? 1 : 0);
          }, 0);

          const ratio = belowCount / Math.max(1, total);

          // 진행률 확인 (지우기)
          console.log("barrier ratio:", ratio.toFixed(2));

          if (ratio >= BARRIER_READY_RATIO) readyFrames += 1;
          else readyFrames = 0;

          if (readyFrames >= READY_FRAMES_NEED) {
            topBarrier.isSensor = false; // 이제부터 진짜 벽...
            barrierActivated = true;
            barrierActivatedRef.current = true; //  클릭 허용 스위치 ON
            console.log("topBarrier 활성화 완료"); // 이것도 지우기
          }
        }

        // meaning overlay를 선택된 단어 아래에 월드 좌표로 고정
        if (meaningEl) {
          const selected = selectedRef.current;
          if (!selected) {
            // 선택 해제면 숨김(WordCloud에서도 opacity 처리하지만 이중 안전)
            meaningEl.style.opacity = "0";
          } else {
            const wb = wordBodiesRef.current.get(selected);
            if (!wb) {
              meaningEl.style.opacity = "0";
            } else {
              // 보여주기
              meaningEl.style.opacity = "1";

              // 단어의 현재 월드 좌표(px)
              const x = wb.body.position.x;
              const y = wb.body.position.y;

              // 단어 아래 meaning 간격(px)
              const GAP = 24;

              // meaning을 단어 바로 아래로
              // (word 자체는 center 기준이고, elem top은 y - h/2로 세팅하므로)
              const meaningX = x;
              const meaningY = y + wb.height / 2 + GAP;

              // meaningEl의 내부 div가 translate(-50%, 0)로 중앙정렬하므로 left/top만 세팅
              const inner = meaningEl.firstElementChild as HTMLElement | null;
              if (inner) {
                inner.style.left = `${meaningX}px`;
                inner.style.top = `${meaningY}px`;
              }
            }
          }
        }

        Matter.Engine.update(engine, 1000 / 50);
        rafRef.current = requestAnimationFrame(update);
      };

      rafRef.current = requestAnimationFrame(update);

      initializedRef.current = true;
    };

    // 스크롤 트리거로 물리 시작 + 자동 스크롤(기존 요구 유지)
    const dropOnScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) {
        initPhysics();
        // 낙하 시작 후 바닥 쪽으로 자동 스크롤
        scrollToY(
          (() => {
            const doc = document.documentElement;
            const maxScroll = doc.scrollHeight - window.innerHeight;

            const root = document.getElementById("wordcloud-root");
            if (!root) return maxScroll;

            const rect = root.getBoundingClientRect();
            const rootTop = window.scrollY + rect.top;
            const rootBottom = rootTop + rect.height;
            let targetY = rootBottom - window.innerHeight - 30;
            targetY = Math.max(0, Math.min(targetY, maxScroll));
            return targetY;
          })(),
          1300 // 낙하 시작 시 자동 스크롤 시간
        );

        window.removeEventListener("scroll", dropOnScroll);
      }
    };

    window.addEventListener("scroll", dropOnScroll);

    return () => {
      window.removeEventListener("scroll", dropOnScroll);

      cancelScrollRaf();
      cancelLiftRaf();

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      const render = renderRef.current;
      const engine = engineRef.current;

      if (render) {
        Matter.Render.stop(render);
        if (canvasRoot.contains(render.canvas))
          canvasRoot.removeChild(render.canvas);
      }

      if (engine) {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }

      initializedRef.current = false;
      selectedRef.current = null;
      transitioningRef.current = false;
      wordBodiesRef.current.clear();
      engineRef.current = null;
      renderRef.current = null;
    };
  }, [scale]);

  return {
    isPhysicsReady,
    onWordClick,
  };
};
