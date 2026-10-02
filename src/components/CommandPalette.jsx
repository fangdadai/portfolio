import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./CommandPalette.css";

const normalize = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** A searchable site index. The parent owns the shortcut and open state. */
export default function CommandPalette({ open, onClose, items = [] }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);
  const backdropPointerRef = useRef(false);
  const resultRefs = useRef([]);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useId();
  const titleId = `${id}-title`;
  const listId = `${id}-results`;
  const hintId = `${id}-hint`;

  const results = useMemo(() => {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      const keywords = Array.isArray(item.keywords)
        ? item.keywords.join(" ")
        : item.keywords;
      const text = normalize(`${item.title} ${item.category || ""} ${keywords || ""}`);
      return terms.every((term) => text.includes(term));
    });
  }, [items, query]);

  const selectedIndex = Math.min(activeIndex, Math.max(0, results.length - 1));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open) return;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQuery("");
    setActiveIndex(0);
    if (!dialog.open) dialog.showModal();
    inputRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      const previousFocus = previousFocusRef.current;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      resultRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, selectedIndex, query]);

  const selectItem = (item) => {
    if (!item) return;
    try {
      item.onSelect?.();
    } finally {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!results.length) return;
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((selectedIndex + direction + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectItem(results[selectedIndex]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="site-index"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropPointerRef.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && backdropPointerRef.current) {
          onClose();
        }
        backdropPointerRef.current = false;
      }}
    >
      <div className="site-index__paper">
        <header className="site-index__header">
          <div>
            <p className="site-index__eyebrow">FANGDA.DAI / SYSTEM INDEX</p>
            <h2 id={titleId}>Command palette.</h2>
          </div>
          <button className="site-index__close" type="button" onClick={onClose}>
            Close <kbd aria-hidden="true">esc</kbd>
          </button>
        </header>

        <div className="site-index__search">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search the site index"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-describedby={hintId}
            aria-activedescendant={
              results.length ? `${id}-result-${selectedIndex}` : undefined
            }
            autoComplete="off"
            spellCheck="false"
            placeholder="Search pages, projects, or field notes…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="site-index__catalogue">
          <p className="site-index__count" role="status" aria-live="polite" aria-atomic="true">
            {results.length} {results.length === 1 ? "entry" : "entries"}
            {query.trim() ? " found" : " in the index"}
          </p>
          <ul id={listId} className="site-index__results" role="listbox" aria-label="Site index results">
            {results.map((item, index) => (
              <li
                key={item.id}
                id={`${id}-result-${index}`}
                ref={(node) => { resultRefs.current[index] = node; }}
                className="site-index__result"
                role="option"
                aria-selected={selectedIndex === index}
                onPointerMove={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectItem(item)}
              >
                <span className="site-index__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="site-index__entry">
                  <span className="site-index__entry-title">{item.title}</span>
                  {item.category && <span className="site-index__category">{item.category}</span>}
                </span>
                <span className="site-index__arrow" aria-hidden="true">↗</span>
              </li>
            ))}
          </ul>
          {!results.length && (
            <div className="site-index__empty">
              <p>No entry on this shelf.</p>
              <span>Try a different word, or clear your search to browse everything.</span>
            </div>
          )}
        </div>

        <footer className="site-index__footer">
          <p id={hintId}><span aria-hidden="true">↑ ↓</span> Arrow keys to browse <span aria-hidden="true">·</span> Enter to open</p>
          <span className="site-index__stamp" aria-hidden="true">READY_</span>
        </footer>
      </div>
    </dialog>
  );
}
