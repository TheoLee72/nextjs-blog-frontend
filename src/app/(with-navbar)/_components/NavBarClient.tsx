'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { postLogout } from '@/lib/client-actions/auth';
import { forceLogout, roughCheckLogin } from '@/lib/server-actions/auth';
export default function NavBarClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = async () => {
      const status = await roughCheckLogin();
      setIsLoggedIn(status);
      setIsLoading(false);
    };
    check();
  }, []);
  // const { isLoggedIn, setIsLoggedIn, isLoading } = useContext(AuthContext)!;
  const menuItems = [
    { name: 'Blog', path: '/blog' },
    { name: 'Search', path: '/search' },
    { name: 'About Me', path: '/about' },
    { name: 'Newsletter', path: '/newsletter' },
  ];
  const menuItemsLoggedIn = [
    { name: 'Blog', path: '/blog' },
    { name: 'Search', path: '/search' },
    { name: 'About Me', path: '/about' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Profile', path: '/profile' },
  ];
  async function handleLogoutButton() {
    try {
      const response = await postLogout();
      if (response.success) {
        setIsLoggedIn(false);
      } else {
        throw new Error('failed');
      }
    } catch (error) {
      console.error('logout failed, force logout...');
      await forceLogout();
      localStorage.removeItem('username');
      setIsLoggedIn(false);
    }
  }
  return (
    <div className="flex justify-between w-full h-[72px] px-[20px] md:px-[calc((100vw-768px)/2)] py-[24px] items-center">
      <div
        className="font-semibold text-[20px] cursor-pointer"
        onClick={() => {
          router.push('/');
          setMenuOpen(false);
        }}
      >
        Theo Lee
      </div>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`menu-btn ${menuOpen ? 'active' : ''} cursor-pointer`}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      {!isLoading ? (
        isLoggedIn ? (
          <>
            <div className="hidden md:flex flex-row gap-x-[25px] absolute left-1/2 -translate-x-1/2">
              {menuItemsLoggedIn.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.path);
                  }}
                  className="cursor-pointer"
                >
                  <p
                    className={
                      pathname === item.path
                        ? 'text-blue font-semibold text-[22px]'
                        : 'text-[15px]'
                    }
                  >
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
            <div className="hidden md:flex flex-row gap-x-[7px]">
              <button onClick={handleLogoutButton} className="cursor-pointer">
                <div className="w-[89px] flex justify-center bg-black h-[29px] items-center rounded-[5px] font-semibold text-white text-[14px]">
                  Sign Out
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex flex-row gap-x-[25px] absolute left-1/2 -translate-x-1/2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.path);
                  }}
                  className="cursor-pointer"
                >
                  <p
                    className={
                      pathname === item.path
                        ? 'text-blue font-semibold text-[22px]'
                        : 'text-[15px]'
                    }
                  >
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
            <div className="hidden md:flex flex-row gap-x-[7px]">
              <button
                onClick={() => router.push('/login')}
                className="cursor-pointer"
              >
                <div className="w-[69px] flex justify-center bg-[#F7F4ED] h-[29px] items-center border-[1px] border-gray rounded-[5px] font-semibold text-[14px]">
                  Sign In
                </div>
              </button>
              <button
                onClick={() => router.push('/register')}
                className="cursor-pointer"
              >
                <div className="w-[81px] flex justify-center bg-black h-[29px] items-center rounded-[5px] font-semibold text-white text-[14px]">
                  Sign Up
                </div>
              </button>
            </div>
          </>
        )
      ) : (
        <></>
      )}
      {menuOpen && (
        <div className="fixed left-0 right-0 bottom-0 top-[72px] z-50 bg-white pt-[15px] px-[20px] md:hidden">
          {!isLoading ? (
            isLoggedIn ? (
              <>
                <div className="h-[70px] flex flex-col gap-y-[7px] justify-center">
                  <button
                    onClick={handleLogoutButton}
                    className="cursor-pointer"
                  >
                    <div className="w-full flex justify-center bg-black h-[29px] items-center rounded-[5px] font-semibold text-white text-[14px]">
                      Sign Out
                    </div>
                  </button>
                </div>
                <div className="relative flex flex-col gap-y-[30px] top-[30px] items-start">
                  {menuItemsLoggedIn.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        router.push(item.path);
                        setMenuOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <p
                        className={
                          pathname === item.path
                            ? 'text-blue font-semibold text-[22px]'
                            : 'text-[15px]'
                        }
                      >
                        {item.name}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="h-[70px] flex flex-col gap-y-[7px] justify-center">
                  <button
                    onClick={() => router.push('/login')}
                    className="cursor-pointer"
                  >
                    <div className="w-full flex justify-center bg-[#F7F4ED] h-[29px] items-center border-[1px] border-gray rounded-[5px] font-semibold text-[14px]">
                      Sign In
                    </div>
                  </button>
                  <button
                    onClick={() => router.push('/register')}
                    className="cursor-pointer"
                  >
                    <div className="w-full flex justify-center bg-black h-[29px] items-center rounded-[5px] font-semibold text-white text-[14px]">
                      Sign Up
                    </div>
                  </button>
                </div>
                <div className="relative flex flex-col gap-y-[30px] top-[30px] items-start">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        router.push(item.path);
                        setMenuOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <p
                        className={
                          pathname === item.path
                            ? 'text-blue font-semibold text-[22px]'
                            : 'text-[15px]'
                        }
                      >
                        {item.name}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
