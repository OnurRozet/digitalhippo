'use client'
import React, {act, useEffect, useRef, useState} from 'react'
import {PRODUCT_CATEGORIES} from "@/config";
import NavItem from "@/components/NavItem";
import {useOnClickOutside} from "@/hooks/use-on-click-outside";

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)

    const isAnyOpen = activeIndex !== null

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                setActiveIndex(null)
            }
        }
        document.addEventListener('keydown', handler)
        return () => {
            document.removeEventListener('keydown', handler)
        }
    },[])

    const navRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(navRef, () => {
        setActiveIndex(null)
    })
    return <div className="flex gap-4 h-full" ref={navRef}>
        {
            PRODUCT_CATEGORIES.map((category, index) => {
                const handleOpen = () => {
                    if (activeIndex === index) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(index)
                    }
                }
                const isOpen = index ===activeIndex

                return (
                    <NavItem category={category} isOpen={isOpen} handleOpen={handleOpen} key={category.value} isAnyOpen={isAnyOpen} />
                )
            })
        }
    </div>

}
export default NavItems
