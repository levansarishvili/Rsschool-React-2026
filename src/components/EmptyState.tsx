import { Component } from 'react';

export class EmptyState extends Component {
  render() {
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <img
          className="w-56"
          src="./assets/data-not-found.svg"
          alt="Item not found"
        />
        <p className="text-gray-500">No products matched your search!</p>
      </div>
    );
  }
}
