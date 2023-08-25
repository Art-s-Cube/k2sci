import {useIsHomePath} from '~/lib/utils';
import {useState} from 'react';
import {
  Drawer,
  useDrawer,
  Text,
  Input,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  Cart,
  CartLoading,
  Link,
} from '~/components';
import {useParams, Form, Await, useMatches} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';

export function Layout({children, layout}) {
  return (
    <>
      <iframe
        title="tag"
        src="https://www.googletagmanager.com/ns.html?id=GTM-P59LZWJ"
        height="0"
        width="0"
      ></iframe>
      <div className="flex flex-col min-h-screen">
        <div className="topBar hidden h-nav lg:flex items-center sticky z-40 top-0 justify-between w-full leading-none gap-4 px-12 py-2">
          <div className="textLeft">
            <a href="tel:1-800-218-7613" className="topEmail">
              <strong>Call: </strong>1-800-218-7613
            </a>
          </div>
          <div className="textCenter"></div>
          <div className="textRight">
            <a
              href="https://www.facebook.com/K2ScientificNC/"
              className="topPhone"
            >
              <svg
                id="uuid-c25b5de3-1f0f-4595-83c6-df0e326e21d4"
                viewBox="0 0 30 30"
              >
                <rect
                  x=".19"
                  y=".08"
                  width="29.83"
                  height="29.83"
                  rx="4.29"
                  ry="4.29"
                  fill="#4373b9"
                />
                <path
                  d="m16.49,13.78v1.23h4.33l-1.17,3.07h-3.03v11.84h-4.27v-11.84h-2.76v-3.07h2.76v-1.26c0-1.88.57-3.44,1.65-4.51,1.11-1.1,2.78-1.69,4.81-1.69,1.34,0,2.58.26,3.4.7l-1.05,2.89c-.56-.27-1.19-.42-1.85-.42-1.82,0-2.82,1.09-2.82,3.06Z"
                  fill="#fff"
                />
              </svg>
            </a>
            <a href="https://instagram.com/k2.scientific" className="topPhone">
              <svg
                id="uuid-3c8fefac-1cbb-4692-9cc9-fe2105f56b9d"
                viewBox="0 0 30 30"
              >
                <defs>
                  <linearGradient
                    id="uuid-9ce43118-84a3-4bfa-8215-8b23d71fc2b4"
                    x1="1.26"
                    y1="28.78"
                    x2="28.59"
                    y2="1.44"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#f9ad50" />
                    <stop offset=".35" stopColor="#dd297b" />
                    <stop offset=".62" stopColor="#8c469b" />
                    <stop offset="1" stopColor="#5660ab" />
                  </linearGradient>
                </defs>
                <rect
                  x=".01"
                  y=".19"
                  width="29.83"
                  height="29.83"
                  rx="4.27"
                  ry="4.27"
                  fill="url(#uuid-9ce43118-84a3-4bfa-8215-8b23d71fc2b4)"
                />
                <path
                  d="m19.54,6.26h-9.23c-2.55,0-4.62,2.07-4.62,4.62v8.45c0,2.55,2.07,4.62,4.62,4.62h9.23c2.55,0,4.62-2.07,4.62-4.62v-8.45c0-2.55-2.07-4.62-4.62-4.62Zm-12.22,4.62c0-1.65,1.34-2.99,2.99-2.99h9.23c1.65,0,2.99,1.34,2.99,2.99v8.45c0,1.65-1.34,2.99-2.99,2.99h-9.23c-1.65,0-2.99-1.34-2.99-2.99v-8.45Z"
                  fill="#fff"
                />
                <path
                  d="m14.93,19.41c2.37,0,4.3-1.93,4.3-4.3s-1.93-4.3-4.3-4.3-4.3,1.93-4.3,4.3,1.93,4.3,4.3,4.3Zm0-6.97c1.47,0,2.67,1.2,2.67,2.67s-1.2,2.67-2.67,2.67-2.67-1.2-2.67-2.67,1.2-2.67,2.67-2.67Z"
                  fill="#fff"
                />
                <path
                  d="m19.63,11.5c.64,0,1.16-.52,1.16-1.16s-.52-1.16-1.16-1.16-1.16.52-1.16,1.16.52,1.16,1.16,1.16Z"
                  fill="#fff"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@k2scientific"
              className="topPhone"
            >
              <svg
                id="uuid-a8be50a0-5675-4b73-922a-5ce6074b7f47"
                viewBox="0 0 30 30"
              >
                <rect
                  x="0"
                  y=".22"
                  width="29.78"
                  height="29.78"
                  rx="4.29"
                  ry="4.29"
                  fill="#ed2224"
                />
                <path
                  d="m21.21,21.71c-.44.05-.9.06-1.33.06-3.39,0-6.79,0-10.18,0-1.07,0-2.23-.03-3.06-.71-.93-.77-1.12-2.1-1.2-3.3-.1-1.65-.11-3.3-.03-4.95.05-.91.13-1.83.52-2.65.28-.59.75-1.12,1.35-1.4.7-.32,1.42-.27,2.17-.27,1.79,0,3.59,0,5.38,0,1.86,0,3.73,0,5.59,0,.88,0,1.83.02,2.55.53.93.66,1.18,1.91,1.3,3.04.21,2.08.22,4.19,0,6.27-.09.86-.23,1.77-.8,2.42-.56.65-1.39.9-2.27.99Z"
                  fill="#fff"
                />
                <polygon
                  points="17.92 15.11 12.86 12.19 12.86 18.03 17.92 15.11"
                  fill="#ed2224"
                />
              </svg>
            </a>
          </div>
        </div>
        <Header
          title={layout?.shop.name ?? 'K2 Scientific'}
          menu={layout?.headerMenu}
        />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer menu={layout?.footerMenu} />
    </>
  );
}

function Header({title, menu, brand}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        brand={brand}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        brand={brand}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}) {
  const [root] = useMatches();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      openFrom="left"
      heading={
        <img
          src="https://cdn.shopify.com/s/files/1/0736/6298/8599/files/k2logo2.svg?v=1683746619"
          alt="Menu"
          width="150"
        />
      }
    >
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
      <div className="topBar h-nav lg:flex items-center sticky z-40 top-0 justify-between w-full leading-none gap-4 px-12 py-2">
        <div className="textLeft">
          <a href="tel:1-800-218-7613" className="topEmail">
            <strong>Call: </strong>1-800-218-7613
          </a>
        </div>
        <div className="textCenter"></div>
        <div className="textRight">
          <a
            href="https://www.facebook.com/K2ScientificNC/"
            className="topPhone"
          >
            <svg
              id="uuid-c25b5de3-1f0f-4595-83c6-df0e326e21d4"
              viewBox="0 0 30 30"
            >
              <rect
                x=".19"
                y=".08"
                width="29.83"
                height="29.83"
                rx="4.29"
                ry="4.29"
                fill="#4373b9"
              />
              <path
                d="m16.49,13.78v1.23h4.33l-1.17,3.07h-3.03v11.84h-4.27v-11.84h-2.76v-3.07h2.76v-1.26c0-1.88.57-3.44,1.65-4.51,1.11-1.1,2.78-1.69,4.81-1.69,1.34,0,2.58.26,3.4.7l-1.05,2.89c-.56-.27-1.19-.42-1.85-.42-1.82,0-2.82,1.09-2.82,3.06Z"
                fill="#fff"
              />
            </svg>
          </a>
          <a href="https://instagram.com/k2.scientific" className="topPhone">
            <svg
              id="uuid-3c8fefac-1cbb-4692-9cc9-fe2105f56b9d"
              viewBox="0 0 30 30"
              className="instaGram"
            >
              <defs>
                <linearGradient
                  id="uuid-9ce43118-84a3-4bfa-8215-8b23d71fc2b4"
                  x1="1.26"
                  y1="28.78"
                  x2="28.59"
                  y2="1.44"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#f9ad50" />
                  <stop offset=".35" stopColor="#dd297b" />
                  <stop offset=".62" stopColor="#8c469b" />
                  <stop offset="1" stopColor="#5660ab" />
                </linearGradient>
              </defs>
              <rect
                x=".01"
                y=".19"
                width="29.83"
                height="29.83"
                rx="4.27"
                ry="4.27"
                fill="url(#uuid-9ce43118-84a3-4bfa-8215-8b23d71fc2b4)"
              />
              <path
                d="m19.54,6.26h-9.23c-2.55,0-4.62,2.07-4.62,4.62v8.45c0,2.55,2.07,4.62,4.62,4.62h9.23c2.55,0,4.62-2.07,4.62-4.62v-8.45c0-2.55-2.07-4.62-4.62-4.62Zm-12.22,4.62c0-1.65,1.34-2.99,2.99-2.99h9.23c1.65,0,2.99,1.34,2.99,2.99v8.45c0,1.65-1.34,2.99-2.99,2.99h-9.23c-1.65,0-2.99-1.34-2.99-2.99v-8.45Z"
                fill="#fff"
              />
              <path
                d="m14.93,19.41c2.37,0,4.3-1.93,4.3-4.3s-1.93-4.3-4.3-4.3-4.3,1.93-4.3,4.3,1.93,4.3,4.3,4.3Zm0-6.97c1.47,0,2.67,1.2,2.67,2.67s-1.2,2.67-2.67,2.67-2.67-1.2-2.67-2.67,1.2-2.67,2.67-2.67Z"
                fill="#fff"
              />
              <path
                d="m19.63,11.5c.64,0,1.16-.52,1.16-1.16s-.52-1.16-1.16-1.16-1.16.52-1.16,1.16.52,1.16,1.16,1.16Z"
                fill="#fff"
              />
            </svg>
          </a>
          <a href="https://www.youtube.com/@k2scientific" className="topPhone">
            <svg
              id="uuid-a8be50a0-5675-4b73-922a-5ce6074b7f47"
              viewBox="0 0 30 30"
            >
              <rect
                x="0"
                y=".22"
                width="29.78"
                height="29.78"
                rx="4.29"
                ry="4.29"
                fill="#ed2224"
              />
              <path
                d="m21.21,21.71c-.44.05-.9.06-1.33.06-3.39,0-6.79,0-10.18,0-1.07,0-2.23-.03-3.06-.71-.93-.77-1.12-2.1-1.2-3.3-.1-1.65-.11-3.3-.03-4.95.05-.91.13-1.83.52-2.65.28-.59.75-1.12,1.35-1.4.7-.32,1.42-.27,2.17-.27,1.79,0,3.59,0,5.38,0,1.86,0,3.73,0,5.59,0,.88,0,1.83.02,2.55.53.93.66,1.18,1.91,1.3,3.04.21,2.08.22,4.19,0,6.27-.09.86-.23,1.77-.8,2.42-.56.65-1.39.9-2.27.99Z"
                fill="#fff"
              />
              <polygon
                points="17.92 15.11 12.86 12.19 12.86 18.03 17.92 15.11"
                fill="#ed2224"
              />
            </svg>
          </a>
        </div>
      </div>
    </Drawer>
  );
}
function MenuMobileNav({menu, onClose}) {
  const [activeItem, setActiveItem] = useState(null); // add state variable to track active item

  const handleItemClick = (item) => {
    if (item.items && item.items.length > 0) {
      // only toggle submenu if item has children
      setActiveItem(item === activeItem ? null : item); // toggle active item
    } else {
      onClose(); // hide menu if link is clicked
    }
  };

  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      <ul>
        {(menu?.items || []).map((item) => (
          <li key={item.title} className="block">
            <span key={item.id} className="block">
              <Link
                to={item.to}
                onClick={() => handleItemClick(item)}
                className={({isActive}) => (isActive ? 'pb-1 -mb-px' : 'pb-1')}
              >
                <Text as="span" size="copy">
                  {item.title}
                </Text>
              </Link>
              {(item.items || []).length > 0 && item === activeItem && (
                <ul className="mobile-Sub absolute top-full left-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg z-50">
                  {(item.items || []).map((subitem) => (
                    <li key={subitem.title} className="submenu mobile">
                      <Link
                        key={subitem.id}
                        to={subitem.to}
                        prefetch="intent"
                        onClick={onClose}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {subitem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
function MobileHeader({isHome, openCart, openMenu}) {
  const params = useParams();

  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader whiteHeader'
          : 'bg-contrast/80 text-primary'
      } flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <img
          className="mobileLogo"
          src="https://cdn.shopify.com/s/files/1/0736/6298/8599/files/k2logo2.svg?v=1683746619"
          alt="k2Sci"
          width="98"
          height="17"
        ></img>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({isHome, menu, openCart}) {
  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
          : 'bg-contrast/80 text-primary'
      } ${
        !isHome && y > 50 && ' shadow-lightHeader'
      } hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`}
    >
      <div className="flex gap-12">
        <Link className="font-bold" to="/" prefetch="intent">
          {
            <img
              className="logoImage"
              src="https://cdn.shopify.com/s/files/1/0736/6298/8599/files/k2logo2.svg?v=1683746619"
              alt="k2Sci"
              width="310"
              height="85"
            ></img>
          }
        </Link>
        <nav className="flex gap-8 main-navigation">
          {/* Top level menu items */}
          <ul className=" one-page-scroll-menu navigation-box">
            {(menu?.items || []).map((item) => (
              <li key={item.id} className="relative">
                <Link
                  to={item.to}
                  prefetch="intent"
                  className={({isActive}) =>
                    isActive ? 'pb-1 -mb-px' : 'pb-1'
                  }
                >
                  {item.title}
                </Link>
                {/* Submenu items */}
                {(item.items || []).length > 0 && (
                  <ul className="sub-menu absolute top-full left-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg z-50">
                    {(item.items || []).map((subitem) => (
                      <li key={subitem.id} className="submenu">
                        <Link
                          key={subitem.id}
                          to={subitem.to}
                          prefetch="intent"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          {subitem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form>
        <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function AccountLink({className}) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

function CartCount({isHome, openCart}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, dark, count}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark
              ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
              : 'text-contrast bg-primary'
          } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <>
      <Section
        divider={isHome ? 'none' : 'top'}
        as="footer"
        role="contentinfo"
        className={`grid footGrid py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-${
          itemsCount - 2
        }
        bg-primary bg-primary/5 dark:text-primary text-contrast overflow-hidden`}
      >
        <div className="footerLogo">
          <Link className="font-bold" to="/" prefetch="intent">
            <img
              className="logoFooter"
              src="https://cdn.shopify.com/s/files/1/0736/6298/8599/files/k2logo2.svg?v=1683746619"
              alt="K2Scientific"
              width="383"
              height="44"
            ></img>
          </Link>
        </div>
        <div className="footerMenu">
          <FooterMenu menu={menu} />
        </div>
      </Section>
      <div className={`self-end pb-4 px-12 copyText bg-primary/5`}>
        &copy; {new Date().getFullYear()} / K2Scientific.
      </div>
    </>
  );
}

function FooterLink({item}) {
  if (item.to.startsWith('http')) {
    return (
      <a
        href={item.to}
        rel="noopener noreferrer"
        className={item.title}
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <ul className="footUl">
      {(menu?.items || []).map((item) => (
        <li key={item.id} className="footmen" id={item.title}>
          <Disclosure>
            {({open}) => (
              <>
                <Link to={item.to} className="text-left">
                  <Heading
                    className="flex justify-between text-black"
                    size="lead"
                    as="h3"
                  >
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Link>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </li>
      ))}
    </ul>
  );
}
