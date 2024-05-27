const Sidebar = () => {

    return (
        <div className="border-r border-lightgray h-full sticky top-0">
            <div className="bg-white w-64 h-full">
                <div className="p-3">
                    <ul className="space-y-4">
                        <li>
                            <a href="/tests" className={`transition-all duration-75 w-full flex items-center gap-2 hover:bg-gray-500/10 p-2 rounded-lg`}>Tests</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar