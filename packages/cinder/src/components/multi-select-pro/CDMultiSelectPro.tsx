import {
  useState,
  useRef,
  useEffect,
  useMemo,
  type ReactElement,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CDMultiSelectProProps,
  CDMultiSelectOption,
  CDMultiSelectGroup,
} from "./types";

export function CDMultiSelectPro({
  value,
  defaultValue = [],
  onChange,
  options = [],
  fetchOptions,
  label,
  placeholder = "Select options...",
  maxTagCount = 3,
  showSelectAll = true,
  searchable = true,
  disabled = false,
  readOnly = false,
  extra,
  className,
  style,
}: CDMultiSelectProProps): ReactElement {
  const [internalSelected, setInternalSelected] = useState<string[]>(
    value !== undefined ? value : defaultValue
  );
  const selectedValues: string[] = value !== undefined ? value : internalSelected;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [dynamicOptions, setDynamicOptions] = useState<CDMultiSelectOption[]>(options);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (options && options.length > 0) {
      setDynamicOptions(options);
    }
  }, [options]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Async options search
  useEffect(() => {
    if (!fetchOptions || !isOpen) return;
    let active = true;
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetchOptions(search);
        if (active) setDynamicOptions(res);
      } catch {
        if (active) setDynamicOptions([]);
      } finally {
        if (active) setIsLoading(false);
      }
    }, 200);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search, fetchOptions, isOpen]);

  const filteredOptions: CDMultiSelectOption[] = useMemo(() => {
    if (fetchOptions) return dynamicOptions;
    if (!search.trim()) return dynamicOptions;
    const q = search.toLowerCase();
    return dynamicOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q) ||
        opt.group?.toLowerCase().includes(q)
    );
  }, [dynamicOptions, search, fetchOptions]);

  // Group options if grouped
  const groupedList: CDMultiSelectGroup[] = useMemo(() => {
    const map = new Map<string, CDMultiSelectOption[]>();
    filteredOptions.forEach((opt: CDMultiSelectOption) => {
      const g = opt.group || "General";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(opt);
    });

    return Array.from(map.entries()).map(([groupName, groupOptions]) => ({
      groupName,
      options: groupOptions,
    }));
  }, [filteredOptions]);

  const updateSelection = (next: string[]): void => {
    if (onChange) {
      const selectedObjs = dynamicOptions.filter((o) => next.includes(o.value));
      onChange(next, selectedObjs);
    } else {
      setInternalSelected(next);
    }
  };

  const handleToggleOption = (optVal: string): void => {
    if (disabled || readOnly) return;
    if (selectedValues.includes(optVal)) {
      updateSelection(selectedValues.filter((v) => v !== optVal));
    } else {
      updateSelection([...selectedValues, optVal]);
    }
    inputRef.current?.focus();
  };

  const handleRemoveTag = (e: React.MouseEvent, optVal: string): void => {
    e.stopPropagation();
    if (disabled || readOnly) return;
    updateSelection(selectedValues.filter((v) => v !== optVal));
  };

  const handleSelectAll = (): void => {
    const allEnabled = dynamicOptions.filter((o) => !o.disabled).map((o) => o.value);
    updateSelection(Array.from(new Set([...selectedValues, ...allEnabled])));
  };

  const handleClearAll = (): void => {
    updateSelection([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && !search && selectedValues.length > 0) {
      updateSelection(selectedValues.slice(0, -1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const visibleTags: string[] = selectedValues.slice(0, maxTagCount);
  const hiddenCount: number = Math.max(0, selectedValues.length - maxTagCount);

  return (
    <div
      ref={containerRef}
      className={cn("cinder-multiselect-wrapper", className)}
      style={style}
    >
      <div className="cinder-multiselect-label-row">
        {label && <label className="cinder-multiselect-label">{label}</label>}
        {extra}
      </div>

      <div
        className={cn(
          "cinder-multiselect-trigger-box",
          isOpen && "open",
          disabled && "disabled"
        )}
        onClick={() => {
          if (!disabled && !readOnly) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        <div className="cinder-multiselect-tags-container">
          {visibleTags.map((val: string) => {
            const opt = dynamicOptions.find((o) => o.value === val);
            const labelText: string = opt ? opt.label : val;
            return (
              <span key={val} className="cinder-multiselect-tag">
                <span className="cinder-multiselect-tag-text">{labelText}</span>
                {!disabled && !readOnly && (
                  <button
                    type="button"
                    className="cinder-multiselect-tag-close"
                    onClick={(e) => handleRemoveTag(e, val)}
                    aria-label={`Remove ${labelText}`}
                  >
                    &times;
                  </button>
                )}
              </span>
            );
          })}

          {hiddenCount > 0 && (
            <span className="cinder-multiselect-overflow-tag">
              +{hiddenCount} more
            </span>
          )}

          {searchable && (
            <input
              ref={inputRef}
              type="text"
              className="cinder-multiselect-search-inline"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder={selectedValues.length === 0 ? placeholder : ""}
              disabled={disabled || readOnly}
            />
          )}

          {!searchable && selectedValues.length === 0 && (
            <span className="cinder-multiselect-placeholder">{placeholder}</span>
          )}
        </div>

        <div className="cinder-multiselect-icons">
          {selectedValues.length > 0 && !disabled && !readOnly && (
            <button
              type="button"
              className="cinder-multiselect-clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              title="Clear selection"
            >
              &times;
            </button>
          )}

          <div className="cinder-multiselect-chevron">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="cinder-multiselect-dropdown">
          {showSelectAll && dynamicOptions.length > 0 && (
            <div className="cinder-multiselect-dropdown-header">
              <button
                type="button"
                className="cinder-multiselect-batch-btn"
                onClick={handleSelectAll}
              >
                Select All
              </button>
              <button
                type="button"
                className="cinder-multiselect-batch-btn"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          )}

          {isLoading && (
            <div className="cinder-multiselect-loading">
              Loading options...
            </div>
          )}

          <div className="cinder-multiselect-list-container">
            {groupedList.map((group: CDMultiSelectGroup) => (
              <div key={group.groupName} className="cinder-multiselect-group-block">
                {groupedList.length > 1 && (
                  <div className="cinder-multiselect-group-title">
                    {group.groupName}
                  </div>
                )}
                {group.options.map((opt: CDMultiSelectOption) => {
                  const isChecked: boolean = selectedValues.includes(opt.value);
                  return (
                    <div
                      key={opt.value}
                      className={cn(
                        "cinder-multiselect-item",
                        isChecked && "selected",
                        opt.disabled && "disabled"
                      )}
                      onClick={() => !opt.disabled && handleToggleOption(opt.value)}
                    >
                      <div className={cn("cinder-multiselect-checkbox", isChecked && "checked")}>
                        {isChecked && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="cinder-multiselect-item-label">{opt.label}</span>
                      {opt.extra && <div className="cinder-multiselect-item-extra">{opt.extra}</div>}
                    </div>
                  );
                })}
              </div>
            ))}

            {!isLoading && filteredOptions.length === 0 && (
              <div className="cinder-multiselect-empty">
                No matching options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const MultiSelectPro = CDMultiSelectPro;
