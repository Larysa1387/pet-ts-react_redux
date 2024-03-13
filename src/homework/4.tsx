import React, { createContext, useMemo, useState, useContext } from 'react';
import noop from 'lodash/noop';
import Navigate from '../types/types_typescript';
// Описати тип SelectedMenu: Це має бути об'єкт, який містить id з типом MenuIds
// Описати тип MenuSelected: Цей тип є об'єктом, що містить selectedMenu
/**  Описати тип MenuAction: Цей тип являє собою об'єкт з методом onSelectedMenu, 
    який приймає об'єкт типу SelectedMenu як аргумент повертає void.*/

type MenuIds = 'first' | 'second' | 'last';
type Menu = { id: MenuIds; title: string };

// Описати тип SelectedMenu:
type SelectedMenu = {
  id?: MenuIds;
};

// Додати тип Menu Selected
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: {},
  //або поставити id обов'язковою властивістю в SelectedMenu, і тоді ---->  selectedMenu: { id: 'first' },
});

// Додайте тип MenuAction
type MenuAction = {
  onSelectedMenu: (obj: SelectedMenu) => void;
};

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  children: React.ReactNode; // Додати тип для children
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({});

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus: Menu[]; // Додайте вірний тип для меню
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu: Menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{' '}
          {selectedMenu.id === menu.id ? 'Selected' : 'Not selected'}
        </div>
      ))}
    </>
  );
}

// type Navigate = {
//   navigate: (url: string) => void;
// };
export function ComponentApp({ navigate }: Navigate) {
  const menus: Menu[] = [
    {
      id: 'first',
      title: 'first',
    },
    {
      id: 'second',
      title: 'second',
    },
    {
      id: 'last',
      title: 'last',
    },
  ];

  return (
    <MenuProvider>
      <button onClick={() => navigate('/')}>Home</button>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
