import { Component } from 'react';

type Props = {
  error?: string;
};

export class ErrorState extends Component<Props> {
  render() {
    return (
      <div className="flex flex-col gap-4">
        <img className="w-80" src="./assets/page-error.jpg" alt="Page error" />
        <p className="">Error: {this.props.error ?? 'Unknown error'}</p>
      </div>
    );
  }
}
