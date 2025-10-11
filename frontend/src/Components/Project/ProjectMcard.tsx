import React, { useMemo, useState } from 'react';
import { SearchBar } from '../common/SearchBar';
import { EmptyState } from '../common/EmptyState';
import { FileText } from 'lucide-react';

interface Member {
  id: string;
  name?: string | null;
  profilePhoto?: string | null;
}

interface ProjectMcardProps {
  handleUser: (memberId: string) => void; // parent handler
  members: any[]; // array of { member: Member } or Member
}

const ProjectMcard: React.FC<ProjectMcardProps> = ({ handleUser, members }) => {

  const normalizedMembers: Member[] = useMemo(() => {
    if (!Array.isArray(members)) return [];
    return members
      .map((m: any) => (m?.member ? m.member : m))
      .filter(Boolean);
  }, [members]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Filter members by name
  const filteredMembers = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return normalizedMembers.filter((member) =>
      (member?.name ?? '').toLowerCase().includes(query)
    );
  }, [normalizedMembers, searchTerm]);

  const handleSelect = (memberId: string) => {
    // Ask for confirmation
    const confirmed = window.confirm('Do you want to add this member?');

    if (confirmed) {
      handleUser(memberId);
      setSelectedMember(memberId);
    } else {
      return;
    }
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH MEMBERS..."
      />

      <div className="mt-3 space-y-2 max-h-80 overflow-y-auto border rounded-lg p-2">
        {filteredMembers.map((member) => {
          const id = member?.id ?? '';
          const isSelected = selectedMember === id;

          return (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className={`flex items-center justify-between p-2 border-2 rounded-lg w-full transition
                ${isSelected ? 'bg-green-100 border-green-500' : 'border-black hover:bg-gray-100'}`}
              type="button"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member?.profilePhoto ?? ''}
                  alt={member?.name ?? 'member'}
                  className="h-10 w-10 rounded-full border-2 border-black object-cover"
                />
                <span className="text-left font-medium">
                  {member?.name ?? 'Unknown member'}
                </span>
              </div>
            </button>
          );
        })}

        {filteredMembers.length === 0 && (
          <EmptyState icon={FileText} message="NO MEMBERS FOUND" />
        )}
      </div>
    </div>
  );
};

export default ProjectMcard;
