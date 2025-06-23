import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";


const menuItems = [
  { name: "Dashboard", icon: "bx bx-grid-alt", link: "/dashboard" },
  { name: "MongoDB", icon: "bx bx-user", children: [
    // children : Add Item and Item List
    { name: "Add Item", icon: "bx bx-plus", link: "/add-item" },
    { name: "Item List", icon: "bx bx-list-ul", link: "/item-list" },

    ] },
  { name: "MySQL", icon: "bx bx-chat",  children: [
    //   children : Add User and User List
    { name: "Add User", icon: "bx bx-user-plus", link: "/add-sql-user" },
    { name: "User List", icon: "bx bx-user-check", link: "/sql-user-list" },
    ], },
  { name: "PostgreSQL", icon: "bx bx-pie-chart-alt-2",  children: [
    // children : Add User and User List
    { name: "Add User", icon: "bx bx-user-plus", link: "/add-pg-user" },
    { name: "User List", icon: "bx bx-user-check", link: "/pg-user-list" },
    
    ], },
  
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);
  const btnRef = useRef(null);
  const navListRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      if (isOpen) {
        btnRef.current.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        btnRef.current.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    }

    if (navListRef.current) {
      if (isOpen) {
        navListRef.current.classList.add("scroll");
      } else {
        navListRef.current.classList.remove("scroll");
      }
    }
  }, [isOpen]);

  const toggleSubmenu = (index) => {
    setSubmenuOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus icon"></i>
          <div className="logo_name">{isOpen && "Demo"}</div>
          <i
            className="bx bx-menu"
            id="btn"
            ref={btnRef}
            onClick={() => setIsOpen((prev) => !prev)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <ul className="nav-list" ref={navListRef}>
          <li>
            <i
              className="bx bx-search"
              onClick={() => setIsOpen((prev) => !prev)}
              style={{ cursor: "pointer" }}
            ></i>
            {isOpen && <input type="text" placeholder="Search..." />}
            <span className="tooltip">Search</span>
          </li>

          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {!item.children ? (
                <li>
                  <Link to={item.link}>
                    <i className={item.icon}></i>
                    <span className="links_name">{item.name}</span>
                  </Link>
                  <span className="tooltip">{item.name}</span>
                </li>
              ) : (
                <li>
                  <div
                    className="submenu-toggle"
                    onClick={() => toggleSubmenu(index)}
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    <i className={item.icon}></i>
                    {isOpen && (
                      <>
                        <span className="links_name">{item.name}</span>
                        <i
                          className={`bx ${
                            submenuOpenIndex === index
                              ? "bx-chevron-up"
                              : "bx-chevron-down"
                          }`}
                          style={{ marginLeft: "auto" }}
                        ></i>
                      </>
                    )}
                  </div>
                  <span className="tooltip">{item.name}</span>

                  {/* Submenu */}
                  {submenuOpenIndex === index && isOpen && (
                    <ul className="submenu" style={{ paddingLeft: "2rem" }}>
                      {item.children.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link to={subItem.link}>
                            <i className={subItem.icon}></i>
                            <span className="links_name">{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </React.Fragment>
          ))}

          {/* Profile */}
          <li className="profile">
            <div className="profile-details">
              {isOpen && (
                <div className="name_job">
                  <div className="name">John Doe</div>
                  <div className="job">@johndoe</div>
                </div>
              )}
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
