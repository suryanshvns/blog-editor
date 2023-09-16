const fileUpload = {
  title: 'Upload file and return file info',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    createdBy: {
      type: 'string',
      description: 'createdBy referencing to the unique id of creator',
      format: 'uuid',
    },
    files: {
      type: 'array',
      description: 'list of files',
      minItems: 1,
      maxItems: 2,
      uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          originalname: {
            type: 'string',
            description: 'name of the file',
            // eslint-disable-next-line max-len
            pattern: '^.*.(xml|csv|xlsx|xlsm|xlsb|xltx|ppt|pptx|html|png|PNG|jpeg|JPEG|jpg|JPG|gif|GIF|doc|DOC|docx|DOCX|pdf|PDF|mp4|MP4|mov|MOV|wmv|WMV|avi|AVI|avchd|AVCHD|flv|FLV|f4v|F4V|swf|SWF|mkv|MKV|webm|WEBM|mpeg|MPEG|mpeg-2|MPEG-2)$',
          },
          size: {
            type: 'integer',
            description: 'size of the file',
          },
        },
        required: [
          'originalname',
          'size',
        ],
        errorMessage: {
          type: 'should be valid object',
          properties: {
            originalname: 'Parameter: originalname should be valid name.',
            size: 'Parameter: size should be a valid number',
          },
          required: {
            originalname: 'Parameter: originalname should be in file data.',
            size: 'Parameter: size is required in file data',
          },
        },
      },
    },
  },
  required: [
    'createdBy',
    'files',
  ],
  errorMessage: {
    properties: {
      files: 'Parameter: files should be in form data.',
      createdBy: 'Parameter: createdBy in params should be a valid guid',
    },
    required: {
      files: 'Parameter: files should be in form data.',
      createdBy: 'Parameter: createdBy is required in params',
    },
  },
};

module.exports = fileUpload;
