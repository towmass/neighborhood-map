import React from "react";

// Top (header) part of the app
class Burger extends React.Component {
  burgerSmash = () => {
    let burger = document.querySelector(".burger");
    let nav = document.querySelector(".nav");
    let map = document.querySelector(".map");

    burger.addEventListener("click", function(e) {
      nav.classList.toggle("pop");
      e.stopPropagation();
    });
    map.addEventListener("click", function() {
      nav.classList.remove("pop");
    });
  };

  render() {
    return (
      // I like to use a particular icon code instead of images
      <a
        className="burger"
        role="navigation"
        aria-label="Menu button for responsive design"
        onClick={this.burgerSmash}
      >
        &#9776;
      </a>
    );
  }
}

export default Burger;
