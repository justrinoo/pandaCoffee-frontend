import React from "react";
import Image from "next/image";
import PromoImage from "public/images/image 45.png";
import Button from "components/Button";

export default function Promo() {
  return (
    <>
      <div className="promo">
        <h2>Promo Today</h2>
        <h4>
          Coupons will be updated every weeks. <br /> Check them out!
        </h4>
        <div className="promo__banner mb-4">
          <div className="promo__banner--img">
            <Image src={PromoImage} alt="" />
          </div>
          <div className="promo__banner--desc">
            <h4>HAPPY MOTHER'S DAY!</h4>
            <p>Get one of out favorite menu for free!</p>
          </div>
        </div>
        <Button childrenClassName="promo__button">Add new promo</Button>
        <div className="promo__rules">
          <div className="promo__rules--desc">
            <h4>Terms and Condition</h4>
            <p>1. You can only apply 1 coupon per day</p>
            <p>2. It only for dine it</p>
            <p>3. Buy 1 get 1 only for new user</p>
            <p>4. Should make member card to apply coupon</p>
          </div>
        </div>
      </div>
    </>
  );
}
