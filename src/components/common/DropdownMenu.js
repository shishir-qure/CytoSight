import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Example({ title, options }) {
  return (
    <div className="w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-teal-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-teal-700 data-open:bg-teal-700">
          {title}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-fit origin-top-right rounded-xl border border-white/5 bg-teal-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          {options.map((item, key) => (
            <MenuItem key={key}>
              <button
                onClick={item.onClick}
                className="group cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
              >
                {item.title}
                {item?.icon}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
