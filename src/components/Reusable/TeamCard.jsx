import React from "react";

const TeamCard = (props) => {
  const { title, nationality, icon } = props.item;

  return (
    <div>
      <div className="single_card  p-3 flex items-center justify-between rounded-md  bg-[#ef6213]">
        <div className="card_content">
          <h4 className="text-white text-xl ">{title}</h4>
          <span className="text-white text-sm">{nationality}</span>
        </div>

        <span className="text-xl font-bold text-gray-200">{icon}</span>
      </div>
    </div>
  );
};

export default TeamCard;
