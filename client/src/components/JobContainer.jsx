import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
// import PageBtnContainer from './PageBtnContainer';
import PageBtnContainer from './PageBtnContainer2';

const JobContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, noOfPages } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {noOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobContainer;
