import { Component } from 'react';

export class EmptyState extends Component {
  render() {
    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        <img
          className="w-56"
          src="./assets/item-not-found.png"
          alt="Item not found!"
        />
        <p className="text-gray-500">No products matched your search!</p>
      </div>
    );
  }
}
