import React from "react";

export default function Footer() {
  return (
    <div className="">
      <footer className="footer footer-horizontal footer-center bg-[#8a6bf115] text-primary-content p-10 relative bottom-0 right-0 left-0">
        <aside className="text-gray-600">
          <img className="w-25 mb-3" src="/blobs-logo-color.svg" />
          <p className="font-bold">
            Providing a safe space to dump your thoughts.
          </p>
          <br />
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </aside>
      </footer>
    </div>
  );
}
