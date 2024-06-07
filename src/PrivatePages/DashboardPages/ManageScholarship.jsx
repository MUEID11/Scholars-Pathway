import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading";
import { Table } from "antd";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { MdUpdate } from "react-icons/md";
import { BiArrowFromLeft, BiArrowFromRight, BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";

const ManageScholarship = () => {
    const axiosPublic = useAxiosPublic();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: null,
    })
    const { data: scholarships = [], isLoading, refetch } = useQuery({
      queryKey: ["scholarships"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/scholarships?current=${pagination?.current}&pageSize=${pagination?.pageSize}`);
        setPagination({...pagination, total: res.data.total})
        return res.data.result;
      },
    });
  if(isLoading)return <Loading/>
    const handleUpdateScholarship = async(id) => {

    }
    const handleDeleteScholarship = async(id) => {

    }
  const columns = [
      {
        title: 'Scholarship Name',
        dataIndex: 'scholarshipName',
        key: 'scholarshipName',
      },
    {
      title: 'University Name',
      dataIndex: 'universityName',
      key: 'universityName',
      },
    {
      title: 'Subject Category',
      dataIndex: 'subjectCategory',
      key: 'subjectCategory',
    },
    {
      title: 'Applied Degree',
      dataIndex: 'degree',
      key: 'degree',
    },
    {
      title: 'Application Fee',
      dataIndex: 'applicationFees',
      key: 'applicationFees',
    },
    {
        title:'Edit',
        dataIndex: 'role',
        key: 'role',
        render: (text, render) => {
            return (
             <div className="space-x-6 flex items-center">
                 <button onClick={() => handleUpdateScholarship(render)}>
                <RiEdit2Line className="text-lg text-green-600" />
              </button>
              <button onClick={() => handleDeleteScholarship(render)}>
                <RiDeleteBinLine className="text-lg text-red-600" />
              </button>
              <Link to={`/scholarship/${render?._id}`} className="flex items-center text-orange-400">
                <BiDetail className="text-lg" /> <BiArrowFromLeft/>
              </Link>
             </div>
            );
          },
    }
  ]; 
    return (
        <div>
           <Table dataSource={scholarships} columns={columns} pagination={true}/>;
        </div>
    );
};

export default ManageScholarship;