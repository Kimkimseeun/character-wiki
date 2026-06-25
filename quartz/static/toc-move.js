function moveQuartzTocIntoPage() {
  const slot = document.querySelector(".wiki-toc-slot")
  if (!slot) return

  const toc = [...document.querySelectorAll("aside, section, div")]
    .find((el) => {
      if (el.closest(".wiki-toc-slot")) return false
      const text = el.textContent || ""
      return text.includes("Table of Contents") && el.querySelector('a[href^="#"]')
    })

  if (!toc) return

  const clone = toc.cloneNode(true)
  clone.classList.add("wiki-moved-toc")
  slot.innerHTML = ""
  slot.appendChild(clone)

  toc.style.display = "none"
}

document.addEventListener("DOMContentLoaded", moveQuartzTocIntoPage)
document.addEventListener("nav", moveQuartzTocIntoPage)