import * as React from 'react';
import { observer } from 'mobx-react';

import type { ResponseModel, MediaTypeModel } from '../../services/models';
import { ResponseDetails } from './ResponseDetails';
import { ResponseDetailsWrap, ResponseWrap, StyledResponseTitle } from './styled.elements';

export interface ResponseViewProps {
  response: ResponseModel;
}

export const ResponseView = observer(({ response }: ResponseViewProps): React.ReactElement => {
  const { extensions, headers, type, summary, description, code, expanded, content } = response;

  const mimes = React.useMemo<MediaTypeModel[]>(
    () =>
      content === undefined ? [] : content.mediaTypes.filter(mime => mime.schema !== undefined),
    [content],
  );

  const empty = React.useMemo<boolean>(
    () =>
      (!extensions || Object.keys(extensions).length === 0) &&
      headers.length === 0 &&
      mimes.length === 0 &&
      !description,
    [extensions, headers, mimes, description],
  );

  return (
    <ResponseWrap $type={type}>
      <StyledResponseTitle
        onClick={() => response.toggle()}
        type={type}
        empty={empty}
        title={summary || ''}
        code={code}
        opened={expanded}
      />
      {expanded && !empty && (
        <ResponseDetailsWrap>
          <ResponseDetails response={response} />
        </ResponseDetailsWrap>
      )}
    </ResponseWrap>
  );
});
