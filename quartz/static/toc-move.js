function moveQuartzTocIntoPage() {
  const slot = document.querySelector(".wiki-toc-slot")
  if (!slot) return

  const toc = [...document.querySelectorAll("aside, div, section")]
    .find((el) => {
      const text = el.textContent || ""
      return text.includes("Table of Contents") && el.querySelector('a[href^="#"]')
    })

  if (!toc) return
  if (slot.contains(toc)) return

  toc.classList.add("wiki-moved-toc")
  slot.appendChild(toc)
}

document.addEventListener("DOMContentLoaded", moveQuartzTocIntoPage)
document.addEventListener("nav", moveQuartzTocIntoPage)