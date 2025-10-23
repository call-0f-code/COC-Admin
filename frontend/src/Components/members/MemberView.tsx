import { FileText } from "lucide-react";
import { Header } from "../common/Header";
import { SearchBar } from "../common/SearchBar";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { MemberCard } from "./MemberCard";
import { EmptyState } from "../common/EmptyState";
import { useMembers } from "../../hooks/useMembers";
import { useState } from "react";
import { globalToast } from "../../utils/toast";

export const MembersView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { members, isLoading, approveCurrentMember } = useMembers();

  const filteredMembers =
    members?.filter((member: Member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="relative  overflow-hidden pt-[80px] space-y-6">
      {/* Fixed header */}
      <Header title="" subtitle="MEMBER_MANAGEMENT" onBack={undefined} />

      {/* Search bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="SEARCH_MEMBERS..."
      />

      {/* Member cards or loading state */}
      {isLoading ? (
        <LoadingSpinner/> 
    ) : 
      (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10  py-8">
        {filteredMembers.map((member:Member) => {
          const isApproving = approveCurrentMember.isPending && approveCurrentMember.variables === member.id;
        
          return (
              <MemberCard 
                key={member.id}
                member={member}
                onApprove={() =>
                  approveCurrentMember.mutate(member.id, {
                    onSuccess: () => {
                      globalToast.success("Member Approved Successfully");
                    },
                  })
                }
                isApproving={isApproving}
              />
            );
          })}

          {filteredMembers.length === 0 && !isLoading && (
            <EmptyState icon={FileText} message="NO_MEMBERS_FOUND" />
          )}
        </div>
      )}
    </div>
  );
};
