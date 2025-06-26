import React, { useState, useEffect } from 'react';
import { CustomSoftware } from '../types/software';
import { PMSCompatibilityStatus, XrayCompatibilityStatus } from '../types/allisone';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface EditSoftwareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (software: CustomSoftware) => void;
  software: CustomSoftware | null;
  pmsStatusOptions: PMSCompatibilityStatus[];
  xrayStatusOptions: XrayCompatibilityStatus[];
}

const EditSoftwareModal: React.FC<EditSoftwareModalProps> = ({
  isOpen,
  onClose,
  onSave,
  software,
  pmsStatusOptions,
  xrayStatusOptions,
}) => {
  const [formData, setFormData] = useState<Partial<CustomSoftware>>({});

  useEffect(() => {
    if (software) {
      setFormData(software);
    } else {
      setFormData({ name: '', company: '', type: 'pms', logo: '', status: 'Not Started' });
    }
  }, [software, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.company) {
      onSave(formData as CustomSoftware);
    }
  };

  const statusOptions = formData.type === 'pms' ? pmsStatusOptions : xrayStatusOptions;
  const inputClass = "block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-gray-200";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{software ? 'Edit' : 'Add'} Software</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className={inputClass} disabled={!!software}>
              <option value="pms">PMS</option>
              <option value="xray">X-ray</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Name</label>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Company</label>
            <input type="text" name="company" value={formData.company || ''} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Logo URL</label>
            <input type="text" name="logo" value={formData.logo || ''} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-bold py-2 px-4 rounded-md transition-colors">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSoftwareModal;
