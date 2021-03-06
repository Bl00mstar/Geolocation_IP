import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ErrorLayout from '../../layout/ErrorLayout/ErrorLayout';

export default function SearchBar({ handleSearch, errData }) {
  const [text, setText] = useState('');
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  useEffect(() => {
    if (errData) {
      setError((error) => ({
        ...error,
        isError: true,
        errorMessage: errData.message,
      }));
    }
  }, [errData]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleError = (data) => {
    if (data) {
      setError((error) => ({ ...error, isError: true, errorMessage: data }));
    }
  };

  const validateInput = (text) => {
    setError((error) => ({ ...error, isError: false, errorMessage: '' }));
    if (text.length < 4) {
      handleError('Minimum 4 characters required.');
      return;
    }
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (ipRegex.test(text)) {
      handleSearch(text);
    } else if (urlRegex.test(text)) {
      let result = text.replace(/(^\w+:|^)\/\//, '');
      handleSearch(result);
    } else {
      handleError('You need to provide a proper value.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInput(text);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledInput className={'inputWithIcon'}>
          <Input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Input URL or IP address"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            style={{ paddingLeft: '50px', paddingRight: '100px' }}
          ></Input>
          <ImageSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="43px"
            height="43px"
            onClick={handleSubmit}
          >
            <path d="M 13.261719 14.867188 L 15.742188 17.347656 C 15.363281 18.070313 15.324219 18.789063 15.722656 19.1875 L 20.25 23.714844 C 20.820313 24.285156 22.0625 23.972656 23.015625 23.015625 C 23.972656 22.058594 24.285156 20.820313 23.714844 20.25 L 19.191406 15.722656 C 18.789063 15.324219 18.070313 15.363281 17.347656 15.738281 L 14.867188 13.261719 Z M 8.5 0 C 3.804688 0 0 3.804688 0 8.5 C 0 13.195313 3.804688 17 8.5 17 C 13.195313 17 17 13.195313 17 8.5 C 17 3.804688 13.195313 0 8.5 0 Z M 8.5 15 C 4.910156 15 2 12.089844 2 8.5 C 2 4.910156 4.910156 2 8.5 2 C 12.089844 2 15 4.910156 15 8.5 C 15 12.089844 12.089844 15 8.5 15 Z" />
          </ImageSvg>
        </StyledInput>
      </form>
      <ErrorLayout isError={error.isError} errorMessage={error.errorMessage} />
    </>
  );
}

const ImageSvg = styled.svg`
  cursor: pointer;
`;

const Input = styled.input`
  height: 40px;
  font-size: 18px;
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  padding-left: 40px;
  padding-right: 0px;
  margin: 8px 0;
  outline: none;
  box-sizing: border-box;
  transition: 0.3s;
  :hover {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
  :focus {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
`;

const StyledInput = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;

  select {
    top: 8px;
    font-size: 18px;
    outline: none;
    right: 0.5rem;
  }

  svg {
    position: absolute;
    left: 0;
    top: 8px;
    padding: 9px 8px;
    fill: black;
    transition: 0.3s;
    :hover {
      fill: #990099;
    }
  }

  input:focus + svg {
    fill: #990099;
  }

  &.inputWithIcon {
    position: relative;
  }
`;
