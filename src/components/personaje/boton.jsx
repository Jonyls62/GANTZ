    
    
    
     const [active, setActive] = useState(false);
    
    <button
        onClick={() => setActive(!active)}
        className={`btn ${
          active ? "btn-danger" : "btn-outline-danger"
        }`}
        style={{
          width: "120px",
          height: "80px",
          borderRadius: "12px",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        ✕
      </button>