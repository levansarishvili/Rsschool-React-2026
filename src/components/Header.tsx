import { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <header className="flex flex-col gap-6 md:gap-10">
        <h1 className="text-lg md:text-xl text-center font-semibold">
          RS-React-App
        </h1>
      </header>
    );
  }
}
