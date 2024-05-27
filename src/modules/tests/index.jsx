import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/slices/table";
import Table from '../../components/table';
import Actions from "./components/actions";

const Tests = () => {
    const dispatch = useDispatch();
    const { data: tests, loading } = useSelector((state) => state.table);
    useEffect(() => {
        dispatch(fetchData({ endpoint: "/site/tests" }))
    }, [dispatch]);

    return (
        <div>
            <Table
                columns={[
                    { title: "ID", render: (row) => row.id },
                    { title: "Name", render: (row) => row.test.name },
                    { title: "Start", render: (row) => row.test_data_from },
                    { title: "End", render: (row) => row.test_data_to },
                    { title: "Status", render: (row) => row.status },
                    { title: "Mark", render: (row) => row.mark ?? "Test hasnt been given yet." },
                    { title: "Actions", render: (row) => <Actions test={row} /> }
                ]}
                data={tests}
                loading={loading}
            />
        </div>
    )
}

export default Tests;