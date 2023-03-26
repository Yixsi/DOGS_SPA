export default function validation(data){
    
    const errors = {}


    if((data.name && !/[a-zA-Z ]+$/.test(data.name)) || !data.name){
        errors.name = 'Empty field or invalid data. Only letters allowed.';
    }

    if(data.image && ! /\bhttps?:\/\/\S+\.(\S+)?(\?\S*)?\b/i.test(data.image)) {
        errors.image = 'Must provide a valid URL';
    }

    if(data.height) {
        const regexHeight = /^(\d+)\s-\s(\d{1,2})$/i;
        const matchHeight = data.height.match(regexHeight);
        if (!matchHeight) {
            errors.height = 'Invalid data. Make sure to write the range with spaces and a hyphen (-).';
        } else {
            const start = parseInt(matchHeight[1]);
            const end = parseInt(matchHeight[2]);
            if (start >= end) {
                errors.height = 'The second number must be greater than the first number in the range.';
            }
        }
    }

    if(data.weight) {
        const regexWeight = /^(\d+)\s-\s(\d{1,2})$/i;
        const matchWeight = data.weight.match(regexWeight);
        if (!matchWeight) {
            errors.weight = 'Invalid data. Make sure to write the range with spaces and a hyphen (-).';
        } else {
            const start = parseInt(matchWeight[1]);
            const end = parseInt(matchWeight[2]);
            if (start >= end) {
                errors.weight = 'The second number must be greater than the first number in the range.';
            }
        }
    }
    
    if(data.lifeSpan) {
        const regex = /^(\d+)\s-\s(\d{1,2})$/i;
        const match = data.lifeSpan.match(regex);
        if (!match) {
            errors.lifeSpan = 'Invalid data. Make sure to write the range with spaces and a hyphen (-).';
        } else {
            const start = parseInt(match[1]);
            const end = parseInt(match[2]);
            if (start >= end) {
                errors.lifeSpan = 'The second number must be greater than the first number in the range.';
            }
        }
    }

    if(data.temper  && (data.temper.length === 0 || data.temper.length > 7)) errors.temper = 'Select 1 up to 7 tempers';

    
    return errors;

}