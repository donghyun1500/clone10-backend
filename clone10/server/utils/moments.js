import moment from 'moment';

module.exports = model => {
    return moment(model.getDataValue('createdAt')).format('YYYY MMMM DD h mm ss a')
}