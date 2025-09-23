import { useState } from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import {House,People,FileText,Gear,BoxArrowRight,List} from "react-bootstrap-icons"
import useContextPro from "../../hooks/useContextPro"

function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(true)

    const {
        state: { user },
    } = useContextPro()

    const menuItems = [
        { name: "Dashboard", icon: <House />, path: "/admin", role: "ADMIN" },
        { name: "Products", icon: <FileText />, path: "/admin/products", role: "ADMIN" },
        { name: "Categories", icon: <Gear />, path: "/admin/categories", role: "ADMIN" },
        { name: "Users", icon: <People />, path: "/admin/users", role: "ADMIN" },
    ]

    const canAccess = (itemRole: string) => {
        if (!user?.roles) return false

        if (user.roles.includes("SUPER_ADMIN")) return true

        return user.roles.includes(itemRole)
    }

    return (
        <div
            className={`bg-dark text-white vh-100 d-flex flex-column transition-all`}
            style={{ width: isOpen ? "220px" : "70px" }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
                {isOpen && <h4 className="m-0">Admin</h4>}
                <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <List />
                </button>
            </div>

            {/* Menu */}
            <Nav className="flex-column mt-3">
                {menuItems
                    .filter((item) => canAccess(item.role))
                    .map((item, i) => (
                        <Nav.Item key={i}>
                            <Nav.Link
                                as={Link}
                                to={item.path}
                                className="text-white d-flex align-items-center gap-2 px-3 py-2"
                            >
                                {item.icon}
                                {isOpen && <span>{item.name}</span>}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
            </Nav>

            {/* Footer */}
            <div className="mt-auto border-top border-secondary">
                <button className="btn btn-dark w-100 d-flex align-items-center gap-2 px-3 py-2">
                    <BoxArrowRight />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar