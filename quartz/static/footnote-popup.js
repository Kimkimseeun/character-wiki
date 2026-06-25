function setupWikiFootnotes() {
  const refs = document.querySelectorAll("a[data-footnote-ref]")

  function closePopup() {
    document.querySelectorAll(".wiki-footnote-popup").forEach((el) => el.remove())
  }

  refs.forEach((ref) => {
    if (ref.dataset.wikiFootnoteReady === "true") return
    ref.dataset.wikiFootnoteReady = "true"

    ref.addEventListener(
      "click",
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        closePopup()

        const href = ref.getAttribute("href")
        if (!href) return

        const id = decodeURIComponent(href.replace("#", ""))
        const footnote = document.getElementById(id)
        if (!footnote) return

        const popup = document.createElement("div")
        popup.className = "wiki-footnote-popup"
        popup.innerHTML = `
          <button class="wiki-footnote-close" aria-label="닫기">×</button>
          <div class="wiki-footnote-content">${footnote.innerHTML}</div>
        `

        document.body.appendChild(popup)

        if (window.innerWidth > 700) {
          const rect = ref.getBoundingClientRect()
          popup.style.left = `${rect.left + window.scrollX}px`
          popup.style.top = `${rect.bottom + window.scrollY + 8}px`
        }

        popup.querySelector(".wiki-footnote-close").addEventListener("click", closePopup)
      },
      true,
    )
  })

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".wiki-footnote-popup") && !e.target.closest("a[data-footnote-ref]")) {
      closePopup()
    }
  })
}

document.addEventListener("DOMContentLoaded", setupWikiFootnotes)
document.addEventListener("nav", setupWikiFootnotes)