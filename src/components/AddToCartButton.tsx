'use client'
import React, {useState, useEffect} from 'react'
import {Button} from "@/components/ui/button";

const AddToCartButton = () => {
    const [isSuccess, setIsSuccess] = useState<Boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess]);

    return (
        <Button onClick={() => setIsSuccess(true)} size="lg"
                className="w-full">{isSuccess ? "Added!" : "Add To Cart"}</Button>
    )
}
export default AddToCartButton
