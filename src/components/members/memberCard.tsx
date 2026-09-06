import { Member } from "types/members"

type MemberCardProps = {
  member: Member
}

export const MemberCard = ({member}: MemberCardProps) => {
  return (
    <div className="member-card">
      <div className="member-image">
        <div className="image-placeholder">
          <span>Foto</span>
        </div>
      </div>
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-description">{member.description}</p>
      </div>
    </div>
  )
}
