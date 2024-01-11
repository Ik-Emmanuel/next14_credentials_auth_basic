"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";


import { BsArrowLeftShort, BsSearch, BsChevronDown, BsPerson, BsReverseLayoutTextSidebarReverse, BsFillImageFill } from 'react-icons/bs';
import { RiDashboardFill } from 'react-icons/ri'
import { AiFillEnvironment, AiOutlineLogout, AiOutlineSetting, AiOutlineBarChart, AiOutlineMail, AiOutlineFileText } from "react-icons/ai"
import { useState } from 'react';

const Sidebar = () => {

    const { data: session } = useSession();

    const handleMouseEnter = () => {

        if (!open) {
            setOpen(!open);
        }
    };

    const handleMouseLeave = () => {

        if (open) {
            setOpen(!open);
        }
    };

    const [open, setOpen] = useState(true)
    const [submenuOpen, setsubmenuOpen] = useState(false)

    const Menus = [
        { title: "Dashboard", path: "/dashboard", icon: <RiDashboardFill /> },
        { title: "Pages", path: "/pages", icon: <AiOutlineFileText /> },
        { title: "Media", path: "/media", spacing: true, icon: <BsFillImageFill /> },
        {
            title: "Projects",
            icon: < BsReverseLayoutTextSidebarReverse />,
            submenu: true,
            path: "/projects",
            submenuItems: [
                { title: "Submenu 1" },
                { title: "Submenu 2" },
                { title: "Submenu 3" },
            ],
        },
        { title: "Analytics", path: "/analitics", icon: < AiOutlineBarChart /> },
        { title: "Inbox", path: "/inbox", icon: <AiOutlineMail /> },
        { title: "Sign Up", path: "/register", spacing: true, icon: <BsPerson /> },

        { title: "Login", path: "/login", icon: <AiOutlineLogout /> },
    ];

    return (

        <>
            <div className={`bg-dark-blue h-screen md:h-screen p-5 pt-8   ${open ? "w-[250px]" : "w-20"} relative  duration-300`}>

                <BsArrowLeftShort className={`bg-white text-dark-blue text-3xl rounded-full absolute -right-3 top-9 border border-dark-blue cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(
                    !open
                )} />

                <div className="inline-flex">
                    <AiFillEnvironment className={`bg-amber-200 text-4xl rounded cursor-pointer block float-left mr-4 duration-300 ${!open && "rotate-[360deg]"}`} />
                    <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}> Medicon </h1>
                </div>
                <hr className="mt-2 w-full" />

                <div className={`flex items-center rounded-md bg-light-white mt-6 px-4 py-2  ${!open ? "px-2.5" : "px-4"}`}>
                    <BsSearch className={`text-white text-lg block float-left cursor-pointer duration-300  ${!open ? "mr-1" : "mr-4"}`} />

                    <input type={"search"} placeholder="Search" className={`text-base bg-transparent w-full text-white focus:outline-none  ${!open && "hidden"}`} />

                </div>

                <ul className="pt-2">
                    {Menus.map((menu, index) => (
                        <>
                            <li key={menu} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md   ${menu.spacing ? "mt-9" : "mt-2"} mt-2`}>

                                <span className={`text-2xl block  float-left`} onMouseEnter={handleMouseEnter} >
                                    {menu.icon ? menu.icon : <RiDashboardFill />}
                                </span>
                                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>

                                    {menu.title === "Projects" ? (
                                        <button onClick={() => {
                                            setsubmenuOpen(!submenuOpen)
                                        }}>
                                            {menu.title}
                                        </button>
                                    ) : (
                                        <Link href={menu.path}>
                                            {menu.title}
                                        </Link>
                                    )}
                                </span>
                                {
                                    menu.submenu && open && (
                                        <BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => {
                                            setsubmenuOpen(!submenuOpen)
                                        }} />
                                    )
                                }
                            </li >

                            {menu.submenu && submenuOpen && open && (
                                <ul className="duration-700">
                                    {menu.submenuItems.map((submenuItem, index) => (
                                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md px-6`}>
                                            {submenuItem.title}

                                        </li>

                                    ))}
                                </ul>
                            )}



                        </>

                    )

                    )}

                    <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md  mt-2`}>

                        <span className={`text-2xl block  float-left`} onMouseEnter={handleMouseEnter} >
                            <AiOutlineLogout />
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                            <button onClick={() => { signOut(); }}>
                                Logout
                            </button>
                        </span>
                    </li >
                </ul>

            </div >

        </>
    )
}

export default Sidebar