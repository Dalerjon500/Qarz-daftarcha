import { FaCheckCircle, FaFilter, FaRegCircle } from "react-icons/fa";

interface Props {
    currentFilter: string;
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
function FilterTodos({ currentFilter, setCurrentFilter, setPage }: Props) {
  return (
    <div className="d-flex gap-3">
                  <button
                    onClick={() => {
                      setCurrentFilter("");
                      setPage(1);
                    }}
                    className="btn d-flex align-items-center gap-2 btn-all"
                    style={{
                      backgroundColor: currentFilter === "" ? "#e8f5e9" : "white",
                      color: currentFilter === "" ? "#2e7d32" : "#455a64",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "8px 15px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <FaFilter size={14} />
                    <span>All</span>
                  </button>
    
                  <button
                    onClick={() => {
                      setCurrentFilter("true");
                      setPage(1);
                    }}
                    className="btn d-flex align-items-center gap-2 btn-all"
                    style={{
                      backgroundColor:
                        currentFilter === "true" ? "#e8f5e9" : "white",
                      color: currentFilter === "true" ? "#2e7d32" : "#455a64",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "8px 15px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <FaCheckCircle size={14} className="text-success" />
                    <span>Completed</span>
                  </button>
    
                  <button
                    onClick={() => {
                      setCurrentFilter("false");
                      setPage(1);
                    }}
                    className="btn d-flex align-items-center gap-2 btn-all"
                    style={{
                      backgroundColor:
                        currentFilter === "false" ? "#e8f5e9" : "white",
                      color: currentFilter === "false" ? "#2e7d32" : "#455a64",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "8px 15px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <FaRegCircle size={14} className="text-warning" />
                    <span>Uncompleted</span>
                  </button>
                </div>
  )
}

export default FilterTodos