function BadgeCard(props) {
  const { emoji, label } = props;
  return (
    <div className="badge-card flex items-center bg-gray-800 border border-gray-700 p-2 rounded-3xl shadow-inner">
      <div>
        <div className="badge w-14 h-14 flex items-center justify-center bg-orange-400 border border-orange-300 rounded-full text-shadow shadow text-2xl">
          {emoji}
        </div>
      </div>

      <span className="ml-3 overflow-scroll">
        {label}
      </span>
    </div>
  );
}

export default BadgeCard;
