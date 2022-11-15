import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function CartAndUser() {
  return (
    <div className="flex flex-row items-center my-3">
      <i className="mx-2">
        <AiOutlineShoppingCart
          size={24}
          className="hover:text-[red] hover:cursor-pointer"
        />
      </i>
      <div className="items-center">
        <input
          type="button"
          value="Đăng nhập"
          className="px-2  mr-4 h-[40px] leading-[40px] border outline-none hover:cursor-pointer hover:bg-slate-400"
        />
        <input
          type="button"
          value="Đăng ký"
          className="px-2 h-[40px] leading-[40px] border outline-none hover:cursor-pointer hover:bg-slate-400"
        />
        {/* <button
          type="button"
          className="px-2 h-[100%] border outline-none hover:bg-slate-400"
        >
          Đăng nhập
        </button>
        <button
          type="button"
          className="px-2 h-[100%] border outline-none hover:bg-slate-400"
        >
          Đăng ký
        </button> */}
      </div>
    </div>
  );
}

export default CartAndUser;