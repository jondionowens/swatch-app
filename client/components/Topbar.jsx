const React = require('react');

const Topbar = () => {
  return (
    <div className="top-bar-wrapper">
      <div className="top-bar__logo"></div>
      <input type="text" className="top-bar__search" name="search" placeholder="Search"/>
    </div>
  )
}

export default Topbar;