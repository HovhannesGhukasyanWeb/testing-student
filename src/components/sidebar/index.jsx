import { icons } from "lucide-react";
import sidebar from "../../constants/sidebar";

const Sidebar = () => {
    const pathname = window.location.pathname;
    return (
        <div className="border-r border-lightgray h-full sticky top-0">
            <div className="bg-white w-64 h-full">
                <div className="p-3">
                    <ul className="space-y-4">
                        {sidebar.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = icons[item.icon];
                            return (
                                <li key={`sidebar-item-${item.path}`}>
                                    <a href={item.path} className={`transition-all duration-75 w-full flex items-center gap-2 hover:bg-gray-500/10 p-2 rounded-lg ${isActive && "bg-gray-500/10 text-blue-500"}`}>
                                        <Icon size="1.25em" name={item.icon} />
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar