import { useEffect } from "react";
import Matter from "matter-js";

export const useMatterSimulation = (scale = 1) => {
  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;

    const canvasRoot = document.getElementById("matter-canvas");
    if (!canvasRoot) return;

    let engine: Matter.Engine | null = null;
    let render: Matter.Render | null = null;
    let runner: Matter.Runner | null = null;
    let animationFrameId: number | null = null;
    let scrollAnimId: number | null = null;

    const BREAK_Y = window.innerHeight * 1.1;

    const initPhysics = () => {
      if (engine) return;

      engine = Engine.create();

      // 전역 중력은 끄고(또는 아주 작게) 개별 force로 제어
      engine.gravity.y = 0;

      const viewportHeight = window.innerHeight;
      const canvasHeight = viewportHeight * 3;

      const canvasSize = {
        width: window.innerWidth,
        height: canvasHeight,
      };

      render = Render.create({
        element: canvasRoot,
        engine,
        options: {
          width: canvasSize.width,
          height: canvasSize.height,
          wireframes: false,
          background: "transparent",
        },
      });

      render.canvas.style.display = "block";
      render.canvas.style.border = "none";
      render.canvas.style.outline = "none";
      render.canvas.style.background = "transparent";

      const floor = Bodies.rectangle(
        canvasSize.width / 2,
        canvasSize.height,
        canvasSize.width,
        40,
        { isStatic: true }
      );

      const leftWall = Bodies.rectangle(
        0,
        canvasSize.height / 2,
        40,
        canvasSize.height,
        { isStatic: true }
      );

      const rightWall = Bodies.rectangle(
        canvasSize.width,
        canvasSize.height / 2,
        40,
        canvasSize.height,
        { isStatic: true }
      );

      const ceiling = Bodies.rectangle(
        canvasSize.width / 2,
        0,
        canvasSize.width,
        40,
        { isStatic: true }
      );

      const elements = Array.from(
        document.querySelectorAll(".word")
      ) as HTMLElement[];

      elements.forEach((el) => {
        el.classList.remove("pointer-events-none");
        el.classList.add("pointer-events-auto");
      });

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
          }
        );

        // 🔹 각 단어별 떨어지는 속도 스케일 (0.4 ~ 1.6 배 정도)
        const fallScale = 0.4 + Math.random() * 1.2;
        // 필요하면 index 기반으로도 가능: const fallScale = 0.6 + (idx % 5) * 0.2;
        (body as any).fallScale = fallScale;

        return {
          elem,
          body,
          render() {
            const { x, y } = body.position;
            elem.style.top = `${y - height / 2}px`;
            elem.style.left = `${x - width / 2}px`;
            elem.style.transform = `rotate(${body.angle}rad)`;

            if (y < BREAK_Y) {
              elem.classList.add("text-white");
              elem.classList.remove("text-mainBlue");
            } else {
              elem.classList.add("text-mainBlue");
              elem.classList.remove("text-white");
            }
          },
        };
      });

      World.add(engine.world, [
        floor,
        leftWall,
        rightWall,
        ceiling,
        ...wordBodies.map((wb) => wb.body),
      ]);

      runner = Runner.create();
      Render.run(render);
      Runner.run(runner, engine);

      const update = () => {
        if (!engine) return;

        // 🔹 각 단어마다 다른 "중력" 적용
        wordBodies.forEach((wb) => {
          const body = wb.body;
          const fallScale = (body as any).fallScale ?? 1;

          // 값은 상황 보면서 조정 (너무 빠르면 줄이고, 느리면 키우면 됨)
          const baseForce = 0.002; // 전체 낙하 세기
          const forceY = baseForce * fallScale * body.mass;

          Body.applyForce(body, body.position, {
            x: 0,
            y: forceY,
          });

          wb.render();
        });

        Engine.update(engine);
        animationFrameId = requestAnimationFrame(update);
      };

      update();
    };

    // 🔹 WordCloud 바닥까지만 자동 스크롤 (기존 코드 그대로)
    const startAutoScroll = () => {
      const doc = document.documentElement;
      const startY = window.scrollY;

      const root = document.getElementById("wordcloud-root");
      const maxScroll = doc.scrollHeight - window.innerHeight;

      let targetY = maxScroll;

      if (root) {
        const rect = root.getBoundingClientRect();
        const rootTop = window.scrollY + rect.top;
        const rootBottom = rootTop + rect.height;
        targetY = rootBottom - window.innerHeight - 30;
        targetY = Math.max(0, Math.min(targetY, maxScroll));
      }

      const duration = 1300;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - t) * (1 - t); // easeOutQuad

        const currentY = startY + (targetY - startY) * eased;
        window.scrollTo(0, currentY);

        if (t < 1) {
          scrollAnimId = requestAnimationFrame(step);
        }
      };

      scrollAnimId = requestAnimationFrame(step);
    };

    const dropOnScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) {
        initPhysics();
        startAutoScroll();
        window.removeEventListener("scroll", dropOnScroll);
      }
    };

    window.addEventListener("scroll", dropOnScroll);

    return () => {
      window.removeEventListener("scroll", dropOnScroll);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (scrollAnimId !== null) {
        cancelAnimationFrame(scrollAnimId);
      }

      if (render && engine && runner) {
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
        World.clear(engine.world, false);

        if (canvasRoot.contains(render.canvas)) {
          canvasRoot.removeChild(render.canvas);
        }
      }
    };
  }, [scale]);
};
