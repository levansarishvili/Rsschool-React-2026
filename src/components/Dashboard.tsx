import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SubmissionCard } from './SubmissionCard';
import type { RootState } from '../store/store';
import { Modal } from './Modal/Modal';
import { UncontrolledForm } from '../forms/UncontrolledForm';
import { ReactHookForm } from '../forms/ReactHookForm';

export const Dashboard: React.FC = () => {
  const [modalType, setModalType] = useState<'none' | 'uncontrolled' | 'rhf'>(
    'none'
  );
  const submissions = useSelector(
    (state: RootState) => state.forms.submissions
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">React Forms</h1>
          <p className="text-text-muted mt-0.5">
            Zod Schema Validation with Redux Global state sync.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setModalType('uncontrolled')}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Uncontrolled Form
          </button>
          <button
            onClick={() => setModalType('rhf')}
            className="px-4 py-2 bg-accent hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            React Hook Form
          </button>
        </div>
      </div>

      <div className="">
        <h2 className="text-xl font-bold mb-4 text-foreground">
          Profiles Log History ({submissions.length})
        </h2>
        {submissions.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-background-secondary">
            <p className="text-text-muted">
              No dynamic responses collected yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submissions.map((data) => (
              <SubmissionCard key={data.id} item={data} />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={modalType !== 'none'}
        onClose={() => setModalType('none')}
        title={
          modalType === 'uncontrolled'
            ? 'Submission via Uncontrolled Form'
            : 'Submission via React Hook Form'
        }
      >
        {modalType === 'uncontrolled' && (
          <UncontrolledForm onSuccess={() => setModalType('none')} />
        )}
        {modalType === 'rhf' && (
          <ReactHookForm onSuccess={() => setModalType('none')} />
        )}
      </Modal>
    </div>
  );
};
