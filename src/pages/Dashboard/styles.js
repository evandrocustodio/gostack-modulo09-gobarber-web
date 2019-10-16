import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    align-self: center;

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }

    button {
      background: none;
      border: 0;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;
export const Time = styled.li`
    padding: 20px;
    border-radius: 4px;
    background: #fff;

    opacity: ${props => (props.past ? 0.6 : 1)}
    ;

    strong {
      display: block;
      font-weight: normal;
      font-size: 20px;
      color: ${props => (!props.available ? '#999' : '#7159c1')}
    }

    span {
      display: block;
      margin-top: 3px;
      color: ${props => (!props.available ? '#666' : '#999')}
    }
  }
`;
