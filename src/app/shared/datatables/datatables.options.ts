export const dtOptions = {
  info: false,
  pagingType: 'full_numbers',
  pageLength: 10,
  searching: false,
  scrollX: false,
  language: {
    info: 'แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว',
    infoEmpty: 'แสดง 0 ถึง 0 จาก 0 แถว',
    lengthMenu: 'แสดง _MENU_ แถว',
    search: 'ค้นหา: ',
    emptyTable: 'ไม่พบรายการค้นหา',
    zeroRecords: 'ค้นหาพบ 0 รายการ',
    paginate: {
      first: 'หน้าแรก',
      previous: '<span class="glyphicon glyphicon-chevron-left"></span>',
      next: '<span class="glyphicon glyphicon-chevron-right"></span>',
      last: 'หน้าสุดท้าย'
    }
  }
};

export const dtOptionsSearch = {
  info: false,
  pagingType: 'full_numbers',
  pageLength: 10,
  columns: [
    { data: 'no' },
    { data: 'tellerNo' },
    { data: 'tellerAddress' },
    { data: 'branch' },
    { data: 'version' },
    { data: 'delete' }
  ],
  columnDefs: [{
    'targets': 'no-sort',
    'orderable': false,
  }],
  searching: false,
  language: {
    info: 'แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว',
    infoEmpty: 'แสดง 0 ถึง 0 จาก 0 แถว',
    lengthMenu: 'แสดง _MENU_ แถว',
    search: 'ค้นหา: ',
    emptyTable: 'ไม่พบรายการค้นหา',
    zeroRecords: 'ค้นหาพบ 0 รายการ',
    paginate: {
      first: 'หน้าแรก',
      previous: '<span class="glyphicon glyphicon-chevron-left"></span>',
      next: '<span class="glyphicon glyphicon-chevron-right"></span>',
      last: 'หน้าสุดท้าย'
    }
  }
};

export const dtOptionsLogBook = {
  info: false,
  pagingType: 'full_numbers',
  pageLength: 10,
  columns: [
    { data: 'no' },
    { data: 'date' },
    { data: 'time' },
    { data: 'problem' },
    { data: 'user' },
    { data: 'delete' }
  ],
  columnDefs: [{
    'targets': 'no-sort',
    'orderable': false,
  }],
  searching: false,
  language: {
    info: 'แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว',
    infoEmpty: 'แสดง 0 ถึง 0 จาก 0 แถว',
    lengthMenu: 'แสดง _MENU_ แถว',
    search: 'ค้นหา: ',
    emptyTable: 'ไม่พบรายการค้นหา',
    zeroRecords: 'ค้นหาพบ 0 รายการ',
    paginate: {
      first: 'หน้าแรก',
      previous: '<span class="glyphicon glyphicon-chevron-left"></span>',
      next: '<span class="glyphicon glyphicon-chevron-right"></span>',
      last: 'หน้าสุดท้าย'
    }
  }
};
