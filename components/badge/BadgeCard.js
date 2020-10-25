function BadgeCard(props) {
  const { emoji, label } = props;
  return (
    <div className="badge-card flex items-center border-4 border-blue-400 text-blue-100 p-2 rounded-3xl shadow-inner">
      <div>
        <div className="badge w-14 h-14 flex items-center justify-center bg-blue-400 border-4 border-blue-300 rounded-full text-shadow shadow text-3xl overflow-hidden">
          {emoji}
        </div>
      </div>

      <span className="ml-3 text-center overflow-scroll w-full text-lg">
        {label}
      </span>
    </div>
  );
}

export default BadgeCard;
