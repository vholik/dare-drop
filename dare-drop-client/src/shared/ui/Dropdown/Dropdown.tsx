import { Fragment, useMemo } from "react";

import { Listbox } from "@headlessui/react";

import cls from "./Dropdown.module.scss";
import CheckIcon from "@/shared/assets/icons/check-icon.svg";
import ChevronSelector from "@/shared/assets/icons/chevron-selector-vertical.svg";

import classNames from "classnames";

export interface DropdownItem<T> {
  value: T;
  content: string;
}

interface DropdownProps<T extends string> {
  className?: string;
  items?: DropdownItem<T>[];
  value?: T;
  onChange: (value: T) => void;
}

export const Dropdown = <T extends string>(props: DropdownProps<T>) => {
  const { className, onChange, items, value } = props;

  const content = useMemo(() => {
    return items?.find((it) => it.value === value)?.content;
  }, [value, items]);

  return (
    <Listbox as="div" value={value} onChange={onChange} className={cls.popup}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={classNames(
              cls.trigger,
              {
                [cls.open]: open,
              },
              [cls.popup]
            )}
          >
            {content}
            <ChevronSelector />
          </Listbox.Button>
          <Listbox.Options className={classNames(cls.menu, {}, [className])}>
            {items
              ? items.map((item) => (
                  <Listbox.Option
                    key={item.value}
                    value={item.value}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li
                        className={classNames(cls.item, {
                          [cls.active]: active,
                        })}
                      >
                        {item.content} {selected && <CheckIcon />}
                      </li>
                    )}
                  </Listbox.Option>
                ))
              : null}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
};
