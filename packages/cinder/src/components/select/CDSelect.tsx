import {
  useState,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  type ReactElement,
  type MouseEvent,
  type KeyboardEvent,
  Children,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { CDChevronDownIcon, CDCloseIcon, CDCheckIcon } from "../icon";
import type {
  CDSelectProps,
  CDSelectOption,
  CDSelectValue,
  CDOptionProps,
  CDSelectPlacement,
} from "./types";

interface DropdownCoords {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  actualPlacement: CDSelectPlacement;
}

export const CDOption = ({ children }: CDOptionProps): ReactElement => {
  return <>{children}</>;
};
CDOption.displayName = "CDOption";
export const Option = CDOption;

export const CDSelect = forwardRef<HTMLDivElement, CDSelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select an option...",
      size = "md",
      multiple = false,
      showSearch = false,
      allowClear = false,
      disabled = false,
      error = false,
      label,
      helperText,
      prefixIcon,
      placement = "bottom",
      portal = true,
      className,
      dropdownClassName,
      dropdownStyle,
      id,
      children,
    }: CDSelectProps,
    ref
  ): ReactElement => {
    // 1. Collect options either from options prop or from children (<CDOption />)
    const normalizedOptions = useMemo<CDSelectOption[]>(() => {
      if (options && options.length > 0) return options;
      const extracted: CDSelectOption[] = [];
      Children.forEach(children, (child) => {
        if (isValidElement<CDOptionProps>(child)) {
          extracted.push({
            value: child.props.value,
            label: child.props.children,
            disabled: child.props.disabled,
            icon: child.props.icon,
            description: child.props.description,
          });
        }
      });
      return extracted;
    }, [options, children]);

    // 2. Value management (controlled or uncontrolled)
    const isControlled: boolean = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<CDSelectValue | CDSelectValue[]>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return multiple ? [] : "";
    });

    const currentValue: CDSelectValue | CDSelectValue[] = isControlled
      ? (controlledValue as CDSelectValue | CDSelectValue[])
      : internalValue;

    // 3. Open state & Search query
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // 4. Coordinates calculation for portal positioning
    const [coords, setCoords] = useState<DropdownCoords>({
      left: 0,
      width: 0,
      actualPlacement: placement,
    });

    const updateCoords = (): void => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 260;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Smart flip: if explicitly top, or below space is tight and above space is larger
      const shouldPlaceTop: boolean =
        placement === "top" || (spaceBelow < dropdownHeight && spaceAbove > spaceBelow);

      if (shouldPlaceTop) {
        setCoords({
          bottom: window.innerHeight - rect.top + 4,
          left: rect.left,
          width: rect.width,
          actualPlacement: "top",
        });
      } else {
        setCoords({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          actualPlacement: "bottom",
        });
      }
    };

    // 5. Update coords on open, resize, or scroll
    useEffect(() => {
      if (!isOpen) return;
      updateCoords();

      const handleScrollOrResize = (): void => {
        updateCoords();
      };

      window.addEventListener("resize", handleScrollOrResize);
      window.addEventListener("scroll", handleScrollOrResize, true);
      return () => {
        window.removeEventListener("resize", handleScrollOrResize);
        window.removeEventListener("scroll", handleScrollOrResize, true);
      };
    }, [isOpen, placement]);

    // 6. Outside click handling (supporting portal on document.body)
    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (event: globalThis.MouseEvent | TouchEvent): void => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          (!dropdownRef.current || !dropdownRef.current.contains(target))
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      document.addEventListener("mousedown", handleOutsideClick, true);
      document.addEventListener("touchstart", handleOutsideClick, true);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick, true);
        document.removeEventListener("touchstart", handleOutsideClick, true);
      };
    }, [isOpen]);

    // 7. Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && showSearch && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, showSearch]);

    // 8. Filtered options based on search query
    const filteredOptions = useMemo<CDSelectOption[]>(() => {
      if (!searchQuery.trim()) return normalizedOptions;
      const query = searchQuery.toLowerCase().trim();
      return normalizedOptions.filter((opt: CDSelectOption) => {
        const labelText = typeof opt.label === "string" ? opt.label : String(opt.value);
        return labelText.toLowerCase().includes(query);
      });
    }, [normalizedOptions, searchQuery]);

    // 9. Selection helper functions
    const isSelected = (val: CDSelectValue): boolean => {
      if (multiple && Array.isArray(currentValue)) {
        return currentValue.includes(val);
      }
      return currentValue === val;
    };

    const handleSelectOption = (opt: CDSelectOption, e: MouseEvent): void => {
      e.stopPropagation();
      if (opt.disabled) return;

      if (multiple) {
        const arr = Array.isArray(currentValue) ? [...currentValue] : [];
        const index = arr.indexOf(opt.value);
        let nextValue: CDSelectValue[];
        if (index > -1) {
          nextValue = arr.filter((v: CDSelectValue) => v !== opt.value);
        } else {
          nextValue = [...arr, opt.value];
        }

        if (!isControlled) setInternalValue(nextValue);
        onChange?.(nextValue, opt);
      } else {
        if (!isControlled) setInternalValue(opt.value);
        onChange?.(opt.value, opt);
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    const handleRemoveTag = (val: CDSelectValue, e: MouseEvent): void => {
      e.stopPropagation();
      if (disabled) return;
      if (multiple && Array.isArray(currentValue)) {
        const nextValue = currentValue.filter((v: CDSelectValue) => v !== val);
        if (!isControlled) setInternalValue(nextValue);
        onChange?.(nextValue);
      }
    };

    const handleClear = (e: MouseEvent): void => {
      e.stopPropagation();
      if (disabled) return;
      const nextValue = multiple ? [] : "";
      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
      if (disabled) return;
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "Enter" || e.key === " ") {
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };

    // 10. Find label(s) for current value
    const hasValue: boolean = multiple
      ? Array.isArray(currentValue) && currentValue.length > 0
      : currentValue !== "" && currentValue !== undefined && currentValue !== null;

    const selectId: string | undefined =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    // 11. Render dropdown element
    const dropdownElement = (
      <div
        ref={dropdownRef}
        className={cn(
          "cinder-select-dropdown",
          coords.actualPlacement === "top" && "cinder-select-dropdown-top",
          dropdownClassName
        )}
        style={{
          ...(portal
            ? {
                position: "fixed",
                top: coords.top !== undefined ? `${coords.top}px` : undefined,
                bottom: coords.bottom !== undefined ? `${coords.bottom}px` : undefined,
                left: `${coords.left}px`,
                width: `${coords.width}px`,
                zIndex: 1050,
              }
            : coords.actualPlacement === "top"
            ? {
                top: "auto",
                bottom: "calc(100% + 4px)",
              }
            : {}),
          ...dropdownStyle,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showSearch && (
          <div className="cinder-select-search-box">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search options..."
              className="cinder-select-search-input"
            />
          </div>
        )}

        <div className="cinder-select-options-list" role="listbox">
          {filteredOptions.length === 0 ? (
            <div className="cinder-select-empty">No options found</div>
          ) : (
            filteredOptions.map((opt: CDSelectOption) => {
              const selected = isSelected(opt.value);
              return (
                <div
                  key={String(opt.value)}
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "cinder-select-option",
                    selected && "cinder-select-option-selected",
                    opt.disabled && "cinder-select-option-disabled"
                  )}
                  onClick={(e) => handleSelectOption(opt, e)}
                >
                  <div className="cinder-select-option-label">
                    {opt.icon && <span>{opt.icon}</span>}
                    <div>
                      <div>{opt.label}</div>
                      {opt.description && (
                        <div className="cinder-select-option-desc">
                          {opt.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {selected && (
                    <span className="cinder-select-option-check">
                      <CDCheckIcon size={14} />
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );

    return (
      <div className={cn("cinder-select-wrapper", className)} ref={ref}>
        {label && (
          <label htmlFor={selectId} className="cinder-select-label">
            {label}
          </label>
        )}

        <div
          ref={containerRef}
          id={selectId}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "cinder-select",
            `cinder-select-${size}`,
            isOpen && "cinder-select-focused",
            disabled && "cinder-select-disabled",
            error && "cinder-select-error"
          )}
        >
          {prefixIcon && <span className="cinder-select-prefix">{prefixIcon}</span>}

          {/* Value Content Area */}
          <div className="cinder-select-content">
            {!hasValue && (
              <span className="cinder-select-placeholder">{placeholder}</span>
            )}

            {hasValue && !multiple && (
              <span className="cinder-select-single-value">
                {(() => {
                  const match = normalizedOptions.find((o) => o.value === currentValue);
                  return match ? match.label : currentValue;
                })()}
              </span>
            )}

            {hasValue && multiple && Array.isArray(currentValue) && (
              <>
                {currentValue.map((val: CDSelectValue) => {
                  const match = normalizedOptions.find((o) => o.value === val);
                  return (
                    <span key={String(val)} className="cinder-select-tag">
                      <span>{match ? match.label : val}</span>
                      {!disabled && (
                        <span
                          className="cinder-select-tag-remove"
                          onClick={(e) => handleRemoveTag(val, e)}
                          title="Remove"
                        >
                          <CDCloseIcon size={12} />
                        </span>
                      )}
                    </span>
                  );
                })}
              </>
            )}
          </div>

          {/* Actions & Suffix */}
          <div className="cinder-select-suffix-actions">
            {allowClear && hasValue && !disabled && (
              <button
                type="button"
                className="cinder-select-clear-btn"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                <CDCloseIcon size={14} />
              </button>
            )}

            <span className={cn("cinder-select-arrow", isOpen && "cinder-select-arrow-open")}>
              <CDChevronDownIcon size={16} />
            </span>
          </div>

          {/* Inline dropdown when portal is false */}
          {!portal && isOpen && !disabled && dropdownElement}
        </div>

        {helperText && (
          <span
            className={cn(
              "cinder-select-helper",
              error && "cinder-select-helper-error"
            )}
          >
            {helperText}
          </span>
        )}

        {/* Portal-rendered floating dropdown when portal is true (default) */}
        {portal &&
          isOpen &&
          !disabled &&
          typeof document !== "undefined" &&
          createPortal(dropdownElement, document.body)}
      </div>
    );
  }
);

CDSelect.displayName = "CDSelect";
export const Select = CDSelect;
