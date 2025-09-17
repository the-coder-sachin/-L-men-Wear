import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom';
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from 'react';

const UserLayout = () => {
  const scrollRef = useRef(null);
  // useEffect(() => {
  //   const scroll = new LocomotiveScroll({
  //     el: scrollRef.current,
  //     smooth: true,
  //     // lerp: 0.5,
  //     smoothMobile: true,
  //     smartphone: {
  //       smooth: true,
  //     },
  //     tablet: {
  //       smooth: true,
  //     },
  //     // optional settings:
  //     // multiplier: 1,
  //     // inertia: 0.75,
  //     // smartphone: { smooth: true },
  //     // tablet: { smooth: true },
  //   });
  //   return () => {
  //     scroll.destroy();
  //   };
  // }, []);
  
  return (
    <div>
      {/* header  */}
      <Header />
      {/* main  */}
      <main >
        <Outlet />
      </main>
      {/* footer  */}
      <Footer />
    </div>
  );
}

export default UserLayout