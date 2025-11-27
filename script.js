// 页面加载完成后的初始化
document.addEventListener("DOMContentLoaded", function () {
  // 添加页面加载动画
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  }, 100);

  // 为所有链接卡片添加点击涟漪效果
  const cards = document.querySelectorAll(".link-card");

  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // 创建涟漪效果
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // 添加键盘导航支持
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // 添加涟漪效果的样式
  const style = document.createElement("style");
  style.textContent = `
        .link-card {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(26, 115, 232, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // 添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 监听窗口大小变化，优化响应式布局
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // 可以在这里添加响应式调整逻辑
      console.log("Window resized");
    }, 250);
  });

  // 添加无障碍支持
  cards.forEach((card, index) => {
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute(
      "aria-label",
      card.querySelector(".card-title").textContent
    );
  });

  // 性能优化：使用 Intersection Observer 实现懒加载动画
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    // 观察所有卡片
    cards.forEach((card) => {
      observer.observe(card);
    });
  }

  // 添加错误处理
  window.addEventListener("error", function (e) {
    console.error("页面错误:", e.error);
  });

  // 控制台输出欢迎信息
  console.log(
    "%c璧山高新区智慧园区",
    "color: #1a73e8; font-size: 24px; font-weight: bold;"
  );
  console.log("%c欢迎访问智慧园区服务平台", "color: #5f6368; font-size: 14px;");
});
