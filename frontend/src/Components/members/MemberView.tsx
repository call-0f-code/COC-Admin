import { FileText, Plus, X } from 'lucide-react';import { Header } from '../common/Header';
import { SearchBar } from '../common/SearchBar';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { MemberCard } from './MemberCard';
import { EmptyState } from '../common/EmptyState';
import { useMembers } from '../../hooks/useMembers';
import { useState } from 'react';
import { globalToast } from '../../utils/toast';


export const MembersView = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const { members, isLoading, approveCurrentMember } = useMembers();
  

  const filteredMembers = members.filter(
    (member: Member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

    console.log(members);
  return (
    <div className="space-y-6">
      <Header
        title="COC.ADMIN"
        subtitle="MEMBER_MANAGEMENT"
        onBack={undefined}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_MEMBERS..."
      />


      {isLoading ? (
        <LoadingSpinner/> 
    ) : 
      (
        <div className="flex gap-4 flex-wrap px-20 px+20 m-8">
        {filteredMembers.map((member:Member) => {
          const isApproving = approveCurrentMember.isPending && approveCurrentMember.variables === member.id;
        
          return (
              <MemberCard 
                key={member.id}
                member={member}
                onApprove={() =>  approveCurrentMember.mutate(member.id ,{
                  onSuccess:()=>{
                    globalToast.success("Member Approved Successfully");
                  }
                  })}
                isApproving={isApproving}  
              />
          )
        })}
    
        {filteredMembers.length === 0 && !isLoading && (
            <EmptyState icon={FileText} message="NO_MEMBERS_FOUND" />
        )}
        </div>
      )}
      </div>
  );
};
